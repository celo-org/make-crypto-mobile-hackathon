from typing import (
	Dict,
	Optional,
	Union,
)


from httpx import AsyncClient


from pymongo import MongoClient


from app.crud.users import users_crud


from app.config.settings import settings


from app.schemas.user import (
	UserSchemaCreate,
	UserSchemaUpdate,
)


from app.tests.utils import (
	random_email,
	random_lower_string,
	random_name,
	random_number,
)


from app.security import (
	create_access_token,
	verify_password,
	get_password_hash,
)


from datetime import timedelta


from fastapi import (
	HTTPException,
)



async def authentication_headers_user(
	*,
	client: AsyncClient,
	username: str,
	password: str,
) -> Dict[str, str]:
	# Authentication headers superadmin --

	data = {
		'username': username,
		'password': password,
	}

	resp = await client.post(
		f'{settings.API_V1_STR}/_auth/access-token',
		data=data,
	)

	result = resp.json()

	print('POOP')
	print(result)

	auth_token = result['access_token']

	headers = {
		'Authorization': f'Bearer {auth_token}',
	}

	return headers





# AUTH token from email --


async def authentication_token_from_username_user(
	*,
	client: AsyncClient,
	username: str,
	db: MongoClient,
) -> Dict[str, str]:
	"""
	Return a valid token for the user with given email.

	If the user doesn't exist it is created first.
	"""

	password = settings.USER_1_PASSWORD.get_secret_value()
	# name = random_name()


	user = users_crud.get_by_username(
		db=db,
		username=username,
	)


	if not user:
		
		user_in_create = UserSchemaCreate(
			username=username,
			password=password,
			address=settings.CELO_ADDRESS_1,
			active=True,
		)

		user = users_crud.create(
			db=db,
			obj_in=user_in_create,
		)

	headers = await authentication_headers_user(
		client=client,
		username=username,
		password=password,
	)

	return headers


