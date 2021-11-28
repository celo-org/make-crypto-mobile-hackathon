from typing import (
	Generator,
	Any,
)

from fastapi import (
	Depends,
	HTTPException,
	status,
)

from fastapi.security import OAuth2PasswordBearer

from jose import jwt

from pydantic import ValidationError


from pymongo import MongoClient


from app.config.settings import settings


from app.schemas.token import TokenSchemaPayload


from app.security import ALGORITHM


from app.database.client import mongo_client


from bson import ObjectId



token_bearer = OAuth2PasswordBearer(
	tokenUrl='/_auth/login/access-token',
)



def get_db() -> Generator:
	# --
	try:
		yield mongo_client
	finally:
		mongo_client.close()



def _get_current_user(
	db: MongoClient = Depends(get_db),
	*,
	token: str,
) -> Any:
	# --
	print('aaa!!')
	print(token)

	try:
		payload = jwt.decode(
			token,
			settings.SECRET_KEY.get_secret_value(),
			algorithms=[ALGORITHM],
		)
		token_data = TokenSchemaPayload(**payload)
	except (jwt.JWTError, ValidationError) as err:
		print('YYY')
		print(err)
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail='Could not validate credentials!',
		)

	print('ZZZ')
	print(token_data.sub)

	user = db['main']['users'].find_one(
		{
			'_id': ObjectId(token_data.sub),
		},
	)

	if not user:
		raise HTTPException(
			status_code=404,
			detail='User not found!',
		)

	return user


def get_current_user(
	db: MongoClient = Depends(get_db),
	token: str = Depends(token_bearer),
) -> Any:
	# --

	current_user = _get_current_user(
		db=db,
		token=token,
	)

	return current_user



def get_current_active_user(
	current_user = Depends(get_current_user),
) -> Any:
	# Current active user --

	if not bool(current_user['active']):
		raise HTTPException(
			status_code=400,
			detail='Inactive user!',
		)

	return current_user



