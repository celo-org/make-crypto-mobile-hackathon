import asyncio


import click


import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


from app.database.dev.client import (
	mongo_client_dev,
)


from app.schemas.user import (
	UserSchemaCreate,
	UserSchemaUpdate,
)


from app.crud.users import users_crud


from app.config.settings import settings




@click.group()
def cli():
	""" Users """
	pass




@click.command()
def create_users() -> None:
	# --

	try:

		user_1_in = UserSchemaCreate(
			email=settings.USER_1_EMAIL,
			username=settings.USER_1_USERNAME,
			password=settings.USER_1_PASSWORD.get_secret_value(),
			celo_address=settings.CELO_ADDRESS_1,
		)

		users_crud.create(
			db=mongo_client_dev,
			obj_in=user_1_in,
		)


		# user_2_in = UserSchemaCreate(
		# 	email=settings.USER_2_EMAIL,
		# 	username=settings.USER_2_USERNAME,
		# 	password=settings.USER_2_PASSWORD.get_secret_value(),
		# 	celo_address=settings.CELO_ADDRESS_3,
		# )

		# users_crud.create(
		# 	db=mongo_client_dev,
		# 	obj_in=user_2_in,
		# )


		# user_3_in = UserSchemaCreate(
		# 	email=settings.USER_3_EMAIL,
		# 	username=settings.USER_3_USERNAME,
		# 	password=settings.USER_3_PASSWORD.get_secret_value(),
		# )

		# users_crud.create(
		# 	db=mongo_client_dev,
		# 	obj_in=user_3_in,
		# )


		# user_4_in = UserSchemaCreate(
		# 	email=settings.USER_4_EMAIL,
		# 	username=settings.USER_4_USERNAME,
		# 	password=settings.USER_4_PASSWORD.get_secret_value(),
		# )

		# users_crud.create(
		# 	db=mongo_client_dev,
		# 	obj_in=user_4_in,
		# )


		# user_5_in = UserSchemaCreate(
		# 	email=settings.USER_5_EMAIL,
		# 	username=settings.USER_5_USERNAME,
		# 	password=settings.USER_5_PASSWORD.get_secret_value(),
		# )

		# users_crud.create(
		# 	db=mongo_client_dev,
		# 	obj_in=user_5_in,
		# )


		# user_6_in = UserSchemaCreate(
		# 	email=settings.USER_6_EMAIL,
		# 	username=settings.USER_6_USERNAME,
		# 	password=settings.USER_6_PASSWORD.get_secret_value(),
		# )

		# users_crud.create(
		# 	db=mongo_client_dev,
		# 	obj_in=user_6_in,
		# )

	finally:

		mongo_client_dev.close()

	




cli.add_command(create_users)



# ismach-celo-serv-mono users create-users


