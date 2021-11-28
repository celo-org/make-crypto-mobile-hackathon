import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



from app.database.client import mongo_client


from pymongo import MongoClient


from typing import (
	Optional,
)


from app.config.settings import settings


from app.security import get_password_hash



async def get_mongo_client():
	return mongo_client



async def mongo_conn_close():
	logging.info('Closing DB Connection!')
	mongo_client.close()
	logging.info('Closed DB Connection!')





# def create_initial_user(
# 	mongo_client: MongoClient,
# 	mongo_database_name: Optional[str] = None,
# ) -> None:
# 	# Mongo DB --
# 	logger.info('Creating initial user...')

# 	if mongo_database_name:
# 		mongo_database = mongo_client.get_database(mongo_database_name)
# 	else:
# 		mongo_database = mongo_client.get_default_database()

# 	if 'users' in mongo_database.list_collection_names():
# 		users_collection = mongo_database.get_collection('users')
# 	else:
# 		users_collection = mongo_database.create_collection('users')


# 	user = {
# 		'name': settings.FIRST_USER_ADMIN_NAME,
# 		'email': settings.FIRST_USER_ADMIN_EMAIL,
# 		'password_hash': get_password_hash(settings.FIRST_USER_ADMIN_PASSWORD.get_secret_value())
# 	}


# 	users_collection.insert_one(user)

# 	logger.info('Done creating initial user!')

# 	return None




def init_database(
	mongo_client: MongoClient,
	mongo_database_name: Optional[str] = None,
) -> None:
	# --
	logger.info('Initializing database...')
	
	# create_initial_user(mongo_client, mongo_database_name)

	logger.info('Done initializing database!')

	return None



def reset_database(
	mongo_client: MongoClient,
	mongo_database_name: Optional[str] = None,
) -> None:
	# --
	logger.info('Resetting database...')

	drop_database(mongo_client, mongo_database_name)
	init_database(mongo_client, mongo_database_name)

	logger.info('Reset database!')

	return None



def drop_database(
	mongo_client: MongoClient,
	mongo_database_name: Optional[str] = None,
) -> None:
	# --

	logger.info('Dropping database...')

	if not mongo_database_name:
		mongo_database_name = mongo_client.get_default_database().name

	mongo_client.drop_database(mongo_database_name) 

	logger.info('Done dropping database!')

	return None





