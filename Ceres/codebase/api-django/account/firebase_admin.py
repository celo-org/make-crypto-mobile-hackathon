import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings

cred = credentials.Certificate(settings.FIREBASE_CONFIG_FILE)
firebase_admin.initialize_app(cred)

def get_auth():
    return auth


def is_email_verified(user):
    firebase_auth = get_auth()
    user = firebase_auth.get_user_by_email(user.email)
    return user.email_verified
