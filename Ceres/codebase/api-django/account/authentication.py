from .models import User

from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext_lazy as _

from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication, TokenAuthentication
from rest_framework.authentication import get_authorization_header

from account import firebase_admin
import base64


class ApiAuthentication(BaseAuthentication):

    keyword = 'Bearer'
    model = User
    request = None
    firebase = None
    cred = None
    auth = None

    # def __init__(self):
    #     print(settings.FIREBASE_ACCOUNT_KEY_PATH)
    #     self.cred = credentials.Certificate(settings.FIREBASE_ACCOUNT_KEY_PATH)
    #     try:
    #         self.firebase = firebase_admin.initialize_app(self.cred)
    #         self.auth = firebase.auth()
    #     except:
    #         pass

    def authenticate(self, request):
        self.request = request
        firebase_auth = firebase_admin.get_auth()
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = _('Invalid token header. No credentials provided.')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid token header. Token string should not contain spaces.')
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1].decode()
        except UnicodeError:
            msg = _(
                'Invalid token header. Token string should not contain invalid characters.')
            raise exceptions.AuthenticationFailed(msg)

        # Validate firebase token
        decoded_token = None
        try:
            decoded_token = firebase_auth.verify_id_token(auth[1])
        except Exception as e:
            print(e)
            msg = _('Something went wrong(decoding token). Try again later')
            raise exceptions.AuthenticationFailed(msg)

        if not auth[1] or not decoded_token:
            return None

        uid = decoded_token.get('uid')
        return self.authenticate_credentials(uid)

    def authenticate_credentials(self, key):

        try:
            user = get_object_or_404(self.model, firebase_uid=key)
        except self.model.DoesNotExist:
            raise exceptions.AuthenticationFailed(_('User not exists in DB.'))

        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                _('User inactive or deleted.'))

        return (user, key)


class ApiAuthenticationToRegister(ApiAuthentication):

    def authenticate_credentials(self, key):

        # try:
        #     user = get_object_or_404(self.model, firebase_uid=key)
        # except self.model.DoesNotExist:
        #     raise exceptions.AuthenticationFailed(_('User not exists in DB.'))

        # if not user.is_active:
        #     raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

        return ({}, key)