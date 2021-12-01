from django.shortcuts import render
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.conf import settings
from django.core.cache import cache
from .serializers import (RegisterUserSerializer)
from core.serializers import (AddressSerializer)
from .authentication import (ApiAuthenticationToRegister, ApiAuthentication)
from .permissions import (APIIsAuthenticated, APIIsAuthenticatedToRegister)

from rest_framework import generics
from rest_framework import mixins
from rest_framework import permissions
from rest_framework import schemas, response
from rest_framework import status
from rest_framework.response import Response

from .models import User, Preference
from core.models import (Gender, Interest, Address, )
from . import firebase_admin
# from . import utils as account_utils
from app import utils as app_utils
from app.models import (Wallet, LOVECRYPTO, CELO)
import re
import string

# Create your views here.

class AuthenticateView(generics.GenericAPIView):

    authentication_classes = (ApiAuthentication,)
    permission_classes = (APIIsAuthenticated,)
    serializer_class = RegisterUserSerializer

    def get(self, request, *args, **kwargs):
        data = self.get_serializer_context()
        return Response(data, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        context = {}
        uid = self.request.data.get('uid')
        if uid:
            user = User.objects.get(firebase_uid=uid)
            # get user balance on lovecrypto wallet
            context['user_data'] = {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'address': {
                    'streat': user.address.streat if user.address else '',
                    'number': user.address.number if user.address else '',
                    'cep': user.address.cep if user.address else '',
                    'city': user.address.city if user.address else ''
                },
                'cpf': user.cpf,
                'phone': user.phone,
                'email_confirmed': user.is_confirmed,
                # 'kyc_valid': kyc,
                'birthday': user.birthday,
                'gender': user.gender.slug if user.gender else user.gender,
                'phone_confirmed': user.phone_confirmed,
                'recommendation_code': user.recommendation_code,
                # 'balance': balanceWallet if balanceWallet else lc_wallet.balance,
                # 'last_balance_update': lc_wallet.last_balance_update,
                'points': user.points
            }
        return context


def resolve_address(user, address):
    serializer = AddressSerializer(data=address)
    if user.address:
        if serializer.is_valid():
            user.address = serializer.update(
                user.address, serializer.validated_data)
    else:
        if serializer.is_valid():
            user.address = serializer.create(serializer.validated_data)


class UpdateUserView(generics.GenericAPIView):

    authentication_classes = (ApiAuthentication,)
    permission_classes = (APIIsAuthenticated,)

    def post(self, request, *args, **kwargs):
        phone = request.data.get('phone')
        gender = request.data.get('gender')
        birthday = request.data.get('birthday')
        address = request.data.get('address')
        cpf = request.data.get('cpf')
        interests = request.data.get('interests')

        uid = self.request.data.get('uid')
        user = User.objects.get(firebase_uid=uid)

        if phone:
            if not re.match(r"^[1-9]{2}9[0-9]{8}$", phone):
                # number incorrect
                return Response({'message': 'Celular inválido'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(phone=phone).exclude(pk=user.pk).exists():
                # number exist
                return Response({'message': 'Celular já cadastrado'}, status=status.HTTP_400_BAD_REQUEST)
            user.phone = phone
        if gender:
            user.gender = Gender.objects.get(pk=gender)
        if cpf:
            if User.objects.filter(cpf=cpf).exclude(pk=user.pk).exists():
                # CPF exist
                return Response({'message': 'CPF já cadastrado'}, status=status.HTTP_400_BAD_REQUEST)
            user.cpf = cpf
        if birthday:
            user.birthday = birthday
        if address:
            resolve_address(user, address)
        if interests:
            preference = 0
            if Preference.objects.filter(user=user).exists():
                preference = Preference.objects.get(user=user)
            else:
                preference = Preference.objects.create(user=user)
            for interest in interests:
                inter = Interest.objects.get(pk=interest)
                preference.interest.add(inter)
            preference.save()
        user.save()
        return Response({'user': user.pk}, status=status.HTTP_200_OK)


class DeleteUserView(generics.DestroyAPIView):
    authentication_classes = (ApiAuthentication,)
    permission_classes = (APIIsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(pk=self.kwargs.get('pk'))

class GetUserBalanceView(generics.GenericAPIView):
    authentication_classes = (ApiAuthentication,)
    permission_classes = (APIIsAuthenticated,)

    def get(self, request, *args, **kwargs):
        data = self.get_serializer_context()
        return Response(data, status=status.HTTP_200_OK)
    
    def get_serializer_context(self):
        context = {}
        uid = self.request.data.get('uid')
        user = User.objects.get(firebase_uid=uid)

        # old version for use balances
        # lc_wallet = Wallet.objects.get(user=user, identifier=LOVECRYPTO)
        # context['points'] = user.points
        # stat, balance = utils.get_balance(lc_wallet)
        # if stat:
        #     context['balance'] = balance
        # new version for wallet balances
        context['wallets'] = app_utils.get_wallets_context_data(user)
        return context