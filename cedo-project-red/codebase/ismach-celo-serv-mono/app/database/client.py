import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



from pymongo import MongoClient


from app.config.settings import settings



# if settings.DEVELOPMENT:
MONGO_URI = settings.MONGO_DEV_URI
MONGO_DB = settings.MONGO_DEV_DB
MONGO_MIN_CONNECTIONS_COUNT = settings.MONGO_DEV_MIN_CONNECTIONS_COUNT
MONGO_MAX_CONNECTIONS_COUNT = settings.MONGO_DEV_MAX_CONNECTIONS_COUNT



mongo_client = MongoClient(
	MONGO_URI,
	# maxPoolSize=MONGO_MAX_CONNECTIONS_COUNT,
	# minPoolSize=MONGO_MIN_CONNECTIONS_COUNT,
)




