import requests
from django.conf import settings
BASE_URL = 'https://pro-api.coinmarketcap.com'
REAL_CMC_ID = '2783'
DOLLAR_CMC_ID = '2781'
CELO_CMC_ID = '5567'
CELO_DOLLAR_CMC_ID = '7236'
HEADERS = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': settings.CMC_API_KEY
}

def check_response(response_data):
    if response_data.status_code == 200:
        json_data = response_data.json()
        data = json_data.get('data')
        if data:
            return (True, data.get('quote'))
    return (False, {})

def celo_dolar_price():
    url = '{base_url}/v1/tools/price-conversion?id={celo_dolar_id}&convert=brl&amount=1'.format(base_url=BASE_URL, celo_dolar_id=CELO_DOLLAR_CMC_ID)
    response = requests.get(url, headers=HEADERS)
    return check_response(response)