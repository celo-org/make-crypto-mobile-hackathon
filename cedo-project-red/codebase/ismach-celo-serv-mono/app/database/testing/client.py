import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



from pymongo import MongoClient


from app.config.settings import settings



MONGO_URI = settings.MONGO_TESTING_URI
MONGO_DB = settings.MONGO_TESTING_DB
MONGO_MIN_CONNECTIONS_COUNT = settings.MONGO_TESTING_MIN_CONNECTIONS_COUNT
MONGO_MAX_CONNECTIONS_COUNT = settings.MONGO_TESTING_MAX_CONNECTIONS_COUNT



mongo_client_testing = MongoClient(
	MONGO_URI,
	maxPoolSize=MONGO_MAX_CONNECTIONS_COUNT,
	minPoolSize=MONGO_MIN_CONNECTIONS_COUNT,
)



