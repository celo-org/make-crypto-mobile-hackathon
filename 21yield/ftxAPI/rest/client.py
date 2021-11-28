import json
import time
import urllib.parse
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List

import numpy as np
from requests import Request, Session, Response
import hmac
from ciso8601 import parse_datetime

from globals import COEFF_EURUSD, MAX_SLIPPAGE, SEUIL_APY


class FtxClient:
    _ENDPOINT = 'https://ftx.com/api/'

    def __init__(self, subaccount_name=None) -> None:
        self._session = Session()
        with open("keys/ftx_secrets.json",) as f:
            data = json.load(f)
            self._api_key = data["login"]
            self._api_secret = data["secret"]
        self._subaccount_name = subaccount_name

    def _get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('GET', path, params=params)

    def _post(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('POST', path, json=params)

    def _delete(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('DELETE', path, json=params)

    def _request(self, method: str, path: str, **kwargs) -> Any:
        request = Request(method, self._ENDPOINT + path, **kwargs)
        self._sign_request(request)
        response = self._session.send(request.prepare())
        return self._process_response(response)

    def _sign_request(self, request: Request) -> None:
        ts = int(time.time() * 1000)
        prepared = request.prepare()
        signature_payload = f'{ts}{prepared.method}{prepared.path_url}'.encode()
        if prepared.body:
            signature_payload += prepared.body
        signature = hmac.new(self._api_secret.encode(), signature_payload, 'sha256').hexdigest()
        request.headers['FTX-KEY'] = self._api_key
        request.headers['FTX-SIGN'] = signature
        request.headers['FTX-TS'] = str(ts)
        if self._subaccount_name:
            request.headers['FTX-SUBACCOUNT'] = urllib.parse.quote(self._subaccount_name)

    def _process_response(self, response: Response) -> Any:
        try:
            data = response.json()
        except ValueError:
            response.raise_for_status()
            raise
        else:
            if not data['success']:
                raise Exception(data['error'])
            return data['result']

    def list_futures(self) -> List[dict]:
        return self._get('futures')

    def get_future(self, future_name: str) -> dict:
        return self._get(f'futures/{future_name}')

    def list_markets(self) -> List[dict]:
        return self._get('markets')

    def get_orderbook(self, market: str, depth: int = None) -> dict:
        return self._get(f'markets/{market}/orderbook', {'depth': depth})

    def get_trades(self, market: str) -> dict:
        return self._get(f'markets/{market}/trades')

    def get_account_info(self) -> dict:
        return self._get(f'account')

    def get_open_orders(self, market: str = None) -> List[dict]:
        return self._get(f'orders', {'market': market})

    def get_order_history(self, market: str = None, side: str = None, order_type: str = None, start_time: float = None,
                          end_time: float = None) -> List[dict]:
        return self._get(f'orders/history',
                         {'market': market, 'side': side, 'orderType': order_type, 'start_time': start_time,
                          'end_time': end_time})

    def get_conditional_order_history(self, market: str = None, side: str = None, type: str = None,
                                      order_type: str = None, start_time: float = None, end_time: float = None) -> List[
        dict]:
        return self._get(f'conditional_orders/history',
                         {'market': market, 'side': side, 'type': type, 'orderType': order_type,
                          'start_time': start_time, 'end_time': end_time})

    def modify_order(
            self, existing_order_id: Optional[str] = None,
            existing_client_order_id: Optional[str] = None, price: Optional[float] = None,
            size: Optional[float] = None, client_order_id: Optional[str] = None,
    ) -> dict:
        assert (existing_order_id is None) ^ (existing_client_order_id is None), \
            'Must supply exactly one ID for the order to modify'
        assert (price is None) or (size is None), 'Must modify price or size of order'
        path = f'orders/{existing_order_id}/modify' if existing_order_id is not None else \
            f'orders/by_client_id/{existing_client_order_id}/modify'
        return self._post(path, {
            **({'size': size} if size is not None else {}),
            **({'price': price} if price is not None else {}),
            **({'clientId': client_order_id} if client_order_id is not None else {}),
        })

    def get_conditional_orders(self, market: str = None) -> List[dict]:
        return self._get(f'conditional_orders', {'market': market})

    def place_order(self, market: str, side: str, price: float, size: float, type: str = 'limit',
                    reduce_only: bool = False, ioc: bool = False, post_only: bool = False,
                    client_id: str = None) -> dict:
        return self._post('orders', {'market': market,
                                     'side': side,
                                     'price': price,
                                     'size': size,
                                     'type': type,
                                     'reduceOnly': reduce_only,
                                     'ioc': ioc,
                                     'postOnly': post_only,
                                     'clientId': client_id,
                                     })

    def place_conditional_order(
            self, market: str, side: str, size: float, type: str = 'stop',
            limit_price: float = None, reduce_only: bool = False, cancel: bool = True,
            trigger_price: float = None, trail_value: float = None
    ) -> dict:
        """
        To send a Stop Market order, set type='stop' and supply a trigger_price
        To send a Stop Limit order, also supply a limit_price
        To send a Take Profit Market order, set type='trailing_stop' and supply a trigger_price
        To send a Trailing Stop order, set type='trailing_stop' and supply a trail_value
        """
        assert type in ('stop', 'take_profit', 'trailing_stop')
        assert type not in ('stop', 'take_profit') or trigger_price is not None, \
            'Need trigger prices for stop losses and take profits'
        assert type not in ('trailing_stop',) or (trigger_price is None and trail_value is not None), \
            'Trailing stops need a trail value and cannot take a trigger price'

        return self._post('conditional_orders',
                          {'market': market, 'side': side, 'triggerPrice': trigger_price,
                           'size': size, 'reduceOnly': reduce_only, 'type': 'stop',
                           'cancelLimitOnTrigger': cancel, 'orderPrice': limit_price})

    def cancel_order(self, order_id: str) -> dict:
        return self._delete(f'orders/{order_id}')

    def cancel_orders(self, market_name: str = None, conditional_orders: bool = False,
                      limit_orders: bool = False) -> dict:
        return self._delete(f'orders', {'market': market_name,
                                        'conditionalOrdersOnly': conditional_orders,
                                        'limitOrdersOnly': limit_orders,
                                        })

    def get_fills(self) -> List[dict]:
        return self._get(f'fills')

    def get_balances(self) -> List[dict]:
        return self._get('wallet/balances')

    def get_deposit_address(self, ticker: str) -> dict:
        return self._get(f'wallet/deposit_address/{ticker}')

    def get_positions(self, show_avg_price: bool = False) -> List[dict]:
        return self._get('positions', {'showAvgPrice': show_avg_price})

    def get_position(self, name: str, show_avg_price: bool = False) -> dict:
        return next(filter(lambda x: x['future'] == name, self.get_positions(show_avg_price)), None)

    def get_all_trades(self, market: str, start_time: float = None, end_time: float = None) -> List:
        ids = set()
        limit = 100
        results = []
        while True:
            response = self._get(f'markets/{market}/trades', {
                'end_time': end_time,
                'start_time': start_time,
            })
            deduped_trades = [r for r in response if r['id'] not in ids]
            results.extend(deduped_trades)
            ids |= {r['id'] for r in deduped_trades}
            print(f'Adding {len(response)} trades with end time {end_time}')
            if len(response) == 0:
                break
            end_time = min(parse_datetime(t['time']) for t in response).timestamp()
            if len(response) < limit:
                break
        return results

    # New functions
    def expiry_dates_of_futures(self):
        futures = self.list_futures()
        res = []
        for elm in futures:
            if elm["type"] == "future":
                dt = datetime.fromisoformat(elm["expiry"])
                res.append(dt.replace(tzinfo=timezone.utc, hour=0))
        expiry_dates = np.unique(np.array(res))
        return expiry_dates

    def list_all_underlying(self):
        res = []
        futures = self.list_futures()
        for elm in futures:
            res.append(elm["underlying"])
        return np.unique(res)

    # def get_futures(self, name: str):
    #     res = []
    #     futures = self.list_futures()
    #     for elm in futures:
    #         if elm["underlying"] == name and elm["type"] == "future":
    #             res.append(elm)
    #     return res

    def get_splippage_and_avg_from_fiat(self, invest: float, market: str, side: str):
        spot_orderbook = self.get_orderbook(market=market)
        orders = spot_orderbook[side]
        # print(orders)
        # print(type(invest))
        fvalue = invest
        total = 0
        weight = 0
        vmax = 0
        for b in orders:
            v = b[0] * b[1]
            vmax = b[0]
            weight += b[1]
            total += v
            fvalue -= v
            if fvalue < 0:
                break
        avg = total / weight
        coeff = 1 if side == "bids" else -1
        slippage = coeff * (vmax - orders[0][0]) / orders[0][0]
        dir = "Buy" if side == "asks" else "Sell"
        print(f"{dir} {invest:.2f} @{avg:.2f} {market} +-{vmax:.4f} (~{slippage:.6f}%)")
        res = {
            "best": orders[0][0],
            "avg": avg,
            "max": vmax,
            "slippage": slippage
        }
        return res

    def get_splippage_and_avg_from_btc(self, amountBTC: float, market: str, side: str):
        spot_orderbook = self.get_orderbook(market=market)
        orders = spot_orderbook[side]
        fvalue = amountBTC
        total = 0
        weight = 0
        vmax = 0
        for b in orders:
            v = b[0] * b[1]
            vmax = b[0]
            weight += b[1]
            total += v
            fvalue -= b[1]
            if fvalue < 0:
                break
        avg = total / weight
        coeff = 1 if side == "bids" else -1
        slippage = coeff * (vmax - orders[0][0]) / orders[0][0]
        dir = "Buy" if side == "asks" else "Sell"
        print(f"{dir} {amountBTC:.2f}BTC @{avg:.2f} {market}, slippage to {vmax:.4f}")
        # print(f"Slippage of {slippage:.6f}%")
        res = {
            "best": orders[0][0],
            "avg": avg,
            "max": vmax,
            "slippage": slippage
        }
        return res

    def nb_days_before_expiry(self, expiry: str):
        expiry_date = datetime.fromisoformat(expiry)
        nbdays = expiry_date.replace(tzinfo=timezone.utc) - datetime.now().replace(tzinfo=timezone.utc)
        return nbdays.days

    def get_cash_carry_premium(self, investment: float, spot_market: str, future_market: str, nb_days: int):
        # spot en eur
        spot = self.get_splippage_and_avg_from_fiat(invest=investment, market=spot_market, side="asks")
        # future en usd
        future = self.get_splippage_and_avg_from_fiat(invest=investment*COEFF_EURUSD, market=future_market, side="bids")
        # TODO : update coeff EURUSD dynamically from source
        premium = (future["avg"] - spot["avg"] * COEFF_EURUSD) / (spot["avg"] * COEFF_EURUSD)
        slippage = premium - (future["max"] - spot["max"] * COEFF_EURUSD) / (spot["max"] * COEFF_EURUSD)
        daily_yield = pow(1+premium, (1/nb_days)) - 1
        apy = pow(1+daily_yield, 365) - 1
        data = {
            "premium": premium*100,
            "slippage": slippage*100,
            "daily_yield": daily_yield*100,
            "apy": apy*100
        }
        print(f"Cash & Carry {future_market}: {premium*100:.4f}% +-{slippage*100:.2f}%. ~{apy*100:.2f}% APY")
        print(f"")
        return spot, future, data

    def is_cash_carry_true(self, coin: str, future_name: str, investment: float, seuil_apy: float):
        print(f"Cash and Carry for : {coin}, {future_name} of {investment}")
        future_market = self.get_future(future_name=future_name)
        spot_market = coin + "/EUR"
        nb_days = self.nb_days_before_expiry(future_market["expiry"])
        # print(nb_days)
        # No position can be taken on expiry date of the future
        if nb_days > 0:
            spot, future, data = self.get_cash_carry_premium(
                investment=investment,
                spot_market=spot_market,
                future_market=future_name,
                nb_days=nb_days
            )
            if data["apy"] > seuil_apy:
                return True, data
            else:
                return False, data
        print("----")
        return False, {}

    def open_positions(self, amountEUR: float, spot_name: str, future_name: str):
        amountUSD = amountEUR * COEFF_EURUSD
        # 0: get slippage and max value position needed
        cond = self.is_cash_carry_true(coin="BTC", future_name=future_name, investment=amountEUR, seuil_apy=SEUIL_APY)
        if cond:
            print("ok")
            btc_data = self.get_splippage_and_avg_from_fiat(invest=amountEUR, market=spot_name, side="asks")
            future_data = self.get_splippage_and_avg_from_fiat(invest=amountUSD, market=future_name, side="bids")
            # 1: buy SPOT convert EUR to BTC
            max_buy_value = btc_data["max"] * (1 + MAX_SLIPPAGE / 100)
            btc_amnt_spot = int(amountEUR / btc_data["avg"] * 10000) / 10000
            print(max_buy_value, amountEUR, btc_amnt_spot)
            response = self.place_order(market=spot_name, side="buy", price=max_buy_value, type="limit",
                                          size=btc_amnt_spot)
            print(response)
            # TODO : capture failure of transaction
            # 2: sell future base on BTC
            max_sell_value = future_data["max"] * (1 - MAX_SLIPPAGE / 100)
            btc_amnt_future = int(amountUSD / future_data["avg"] * 10000) / 10000
            print(max_sell_value, amountUSD, btc_amnt_future)
            response2 = self.place_order(market=future_name, side="sell", price=max_sell_value, type="limit",
                                         size=btc_amnt_future)
            print(response2)
            # TODO 2.1: if future can't be taken, try again. After 2 failed attemps, revert spot buying.
            # TODO 2.2: alert main Admin Dahsboard
            # TODO 3: return position and effective spread - fees
        else:
            # TODO : wait ? or retry ?
            print("not ok")

    def close_spot(self, amountBTC: float, spot_name: str):
        # sell SPOT convert BTC to EUR
        btc_data = self.get_splippage_and_avg_from_btc(amountBTC=amountBTC, market=spot_name, side="bids")
        max_sell_value = btc_data["max"] * (1 + MAX_SLIPPAGE / 100)
        print(max_sell_value, amountBTC)
        response = self.place_order(market=spot_name, price=max_sell_value, side="sell", type="limit", size=amountBTC)
        return response

    def close_future(self, amountBTC: float, future_name: str):
        # sell SPOT convert BTC to EUR
        future_data = self.get_splippage_and_avg_from_btc(amountBTC=amountBTC, market=future_name, side="bids")
        min_buy_value = future_data["max"] * (1 - MAX_SLIPPAGE / 100)
        print(max_sell_value, amountBTC)
        response = self.place_order(market=future_name, price=min_buy_value, side="buy", type="limit", size=amountBTC)
        return response
