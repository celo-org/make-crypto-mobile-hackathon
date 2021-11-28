from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from dynamodb.functions import update_all_portfolios
from rest.client import FtxClient


# Function that check if cash and carry is possible for amount
@api_view(['GET'])
def cash_carry_available(request, amount):
    try:
        rest = FtxClient()

        seuil_apy = 10
        c = "BTC"
        dt_str = "0325"

        can_open, results = rest.is_cash_carry_true(coin=c, future_name=f"{c}-{dt_str}", investment=float(amount), seuil_apy=seuil_apy)

        return JsonResponse({'canOpen': can_open, "data": results}, status=200)
    except:
        return JsonResponse({'canOpen': False, "data": {}}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def update_all_portfolios_in_dynamodb(request,):
    try:
        update_all_portfolios()
        return JsonResponse({'updated': True, "data": {}}, status=200)
    except:
        return JsonResponse({'updated': False, "data": {}}, status=status.HTTP_404_NOT_FOUND)
