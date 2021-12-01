from django.utils.crypto import get_random_string
import string
from .models import Wallet
from django.utils import timezone
import datetime
from . import smart_contract as sc

def get_five_randon_string():
    return get_random_string(5, string.ascii_letters+string.digits)

def get_balance(wallet):
    balanceWallet = None
    try:
        stat, data = sc.get_balance(wallet.address)
        if stat:
            balanceWallet = data.get('balanceWallet')
            wallet.balance = float(balanceWallet)
            # last balance update
            wallet.last_balance_update = datetime.datetime.now()
            wallet.save()
            return(True, balanceWallet)
        return (False, None)
    except Exception as e:
        print('exception: ', e)
        pass
    return (False, None)

def get_wallets_context_data(user):
    wallets_balance = []
    wallets = Wallet.objects.filter(user=user)
    for wallet in wallets:
        stat, balance = get_balance(wallet)
        if stat:
            wallets_balance.append({
                'balance': balance,
                'identifier': wallet.identifier,
                'address': wallet.address,
                'last_update': wallet.last_balance_update
            })
    return wallets_balance