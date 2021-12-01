from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext_lazy as _

from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from rest_framework.authentication import get_authorization_header
from rest_framework.permissions import BasePermission

from account import firebase_admin

from .models import User
from django.contrib.auth import authenticate
import base64


class SchemaAPI(BasePermission):

    def has_permission(self, request, view):
        return True


class APIIsAuthenticated(BasePermission):

    keyword = 'Bearer'
    model = User
    request = None
    firebase = None
    cred = None
    auth = None

    def has_permission(self, request, view):
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
            msg = _('Something went wrong(decoding token). Try again later')
            raise exceptions.AuthenticationFailed(msg)

        if not auth[1] or not decoded_token:
            return None

        uid = decoded_token.get('uid')
        request.data['uid'] = uid
        return self.check_user(uid, request)

    def check_user(self, key, request):
        user = {}
        try:
            user = get_object_or_404(self.model, firebase_uid=key)
        except self.model.DoesNotExist:
            raise exceptions.AuthenticationFailed(_('User not exists in DB.'))

        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                _('User inactive or deleted.'))
        request.user = user
        return True


class APIIsAuthenticatedToRegister(APIIsAuthenticated):

    def check_user(self, key, request):
        # try:
        # 	user = get_object_or_404(self.model, firebase_uid=key)
        # except self.model.DoesNotExist:
        # 	raise exceptions.AuthenticationFailed(_('User not exists in DB.'))

        # if not user.is_active:
        # 	raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

        return True