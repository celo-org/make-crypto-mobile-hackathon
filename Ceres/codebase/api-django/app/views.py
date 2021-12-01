from django.shortcuts import render
from django.shortcuts import render
from django.conf import settings
from django.utils.crypto import get_random_string
from django.db import transaction

from account.serializers import (RegisterUserSerializer)
from account.authentication import (ApiAuthenticationToRegister, ApiAuthentication)
from account.permissions import (APIIsAuthenticated, APIIsAuthenticatedToRegister)

from rest_framework import generics, status
from rest_framework.response import Response
from . import coin_market_cap as cmc
from . import smart_contract as sc
from .models import Wallet, CELO, LOVECRYPTO

import string

# Create your views here.
class RegisterUsertView(generics.CreateAPIView):
    authentication_classes = (ApiAuthenticationToRegister,)
    permission_classes = (APIIsAuthenticatedToRegister,)
    serializer_class = RegisterUserSerializer

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        mutable = request.POST._mutable
        request.POST._mutable = True
        request.data['recommendation_code'] = get_random_string(
            8, string.ascii_uppercase+string.digits)
        request.POST._mutable = mutable
        return super(RegisterUsertView, self).post(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        obj = serializer.save()
        # point to user that recommed
        # recommended_by = self.request.data.get('recommended_by')
        # if recommended_by and recommended_by != '':
        #     utils.reward_user_for_indication(recommended_by, obj)

        # criar carteira lovecrypto
        status, data = sc.create_wallet('celo')
        if status:
            Wallet.objects.create(user=obj, identifier=CELO, address=data.get(
                'address'), secret=data.get('privateKey'), words=data.get('words'))
        else:
            print('raise exception: => ', status, data)
            raise Exception

class GetCeloDolarPriceView(generics.GenericAPIView):
    authentication_classes = (ApiAuthentication,)
    permission_classes = (APIIsAuthenticated,)

    def get(self, request, *args, **kwargs):
        data = self.get_serializer_context()
        return Response(data, status=status.HTTP_200_OK)
    
    def get_serializer_context(self):
        context = {}
        uid = self.request.data.get('uid')
        stat, data = cmc.celo_dolar_price()
        if stat:
            # cache_key = uid+settings.CUSD_VALUE_CACHE_KEY_SUFIX
            # cache.set(cache_key, data, 60*30)  # 30min cache
            return data
        return context