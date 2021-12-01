import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = True
ALLOWED_HOSTS = ['localhost:8000', 'localhost', '*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
# COIN MARKET CAP
CMC_API_KEY = 'a401c7eb-c2ab-4162-86e9-868c624aa424'