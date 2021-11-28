import json
import time
from typing import Optional, Any
from requests import Request, Session, Response
from typing import Dict
import hmac


class FtxOtcClient:
    _ENDPOINT = 'https://otc.ftx.com/api/'

    def __init__(self) -> None:
        self._session = Session()
        with open("keys/ftx_otc_secrets.json",) as f:
            data = json.load(f)
            self._api_key = data["login"]
            self._api_secret = data["secret"]

    def _get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('GET', path, params=params)

    def _post(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request('POST', path, json=params)

    def _delete(self, path: str) -> Any:
        return self._request('DELETE', path)

    def request_otc_quote(self, base_currency: str, quote_currency: str, side: str,
                          base_currency_size: Optional[float] = None,
                          quote_currency_size: Optional[float] = None,
                          wait_for_price: bool = True) -> Any:
        assert (quote_currency_size is None) ^ (base_currency_size is None)
        return self._post('otc/quotes', {
            'baseCurrency': base_currency,
            'quoteCurrency': quote_currency,
            'baseCurrencySize': base_currency_size,
            'quoteCurrencySize': quote_currency_size,
            'waitForPrice': wait_for_price,
            'side': side,
        })

    def _request(self, method: str, path: str, **kwargs) -> Any:
        request = Request(method, self._ENDPOINT + path, **kwargs)
        self._sign_request(request, path)
        response = self._session.send(request.prepare())
        return self._process_response(response)

    def _sign_request(self, request: Request, path: str) -> None:
        ts = int(time.time() * 1000)
        prepared = request.prepare()
        signature_payload = f'{ts}{prepared.method}/{path}'.encode()
        if prepared.body:
            signature_payload += prepared.body
        signature = hmac.new(self._api_secret.encode(), signature_payload, 'sha256').hexdigest()
        request.headers['FTX-APIKEY'] = self._api_key
        request.headers['FTX-TIMESTAMP'] = str(ts)
        request.headers['FTX-SIGNATURE'] = signature

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

    def get_balances(self):
        return self._get('balances')