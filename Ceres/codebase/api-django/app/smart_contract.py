import jwt
import requests
from django.conf import settings
from .models import (LOVECRYPTO, Wallet)
from .utils import get_five_randon_string

code = get_five_randon_string()
encoded = jwt.encode({'data': code+'_lovekey_'+code}, settings.SC_JWT_SECRET)

HEADERS = {
    'lovekey': encoded
}

def check_response(response, endpoint):
    if response.status_code == 200 or response.status_code == 201:
        # if endpoint == 'create_wallet':
        #     return (True, response.json())
        # elif endpoint == 'transfer':
        #     return (True, response.json())
        # elif (endpoint == 'add_user_in_campaign'):
        #     return (True, response.json())
        # elif endpoint == 'get_balance':
        #     return (True, response.json())
        return (True, response.json())
    return (False, response.json())


def create_wallet(identifier=None):
    uri = settings.SMART_CONTRAT_API+'getNewAccount'
    if identifier:
        uri += '?identifier={identifier}'.format(identifier=identifier)
    response = requests.get(uri, headers=HEADERS)
    return check_response(response, 'create_wallet')


def get_balance(address):
    uri = settings.SMART_CONTRAT_API+'getBalanceAccount/'+address
    response = requests.get(uri, headers=HEADERS)
    return check_response(response, 'get_balance')


def transfer(user, destination_address, amount, wallet=LOVECRYPTO):
    user_wallet = Wallet.objects.get(user=user, identifier=wallet)
    uri = settings.SMART_CONTRAT_API+'transferFundsToWallet'
    data = {
        'fromWallet': user_wallet.address,
        'privateKey': user_wallet.secret,
        'toWallet': destination_address,
        'amountToSend': str(int(amount))
    }
    response = requests.post(url=uri, json=data, headers=HEADERS)
    return check_response(response, 'transfer')


def add_user_in_campaign(user, task):
    wallets = []
    uri = settings.SMART_CONTRAT_API+'addTaskTaker'

    # get data
    user_wallet = Wallet.objects.get(user=user, identifier=LOVECRYPTO)
    wallets.append(user_wallet.address)
    campaign = task.campaign
    data = {
        'address': campaign.manager_address,  # campaign Manager
        'privateKey': campaign.manager_secret,  # campaign Manager
        'payment': str(int(task.reward)),
        'contractAddress': campaign.contract_address,
        'wallets': wallets
    }
    response = requests.put(url=uri, json=data, headers=HEADERS)
    return check_response(response, 'add_user_in_campaign')
