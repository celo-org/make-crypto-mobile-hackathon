import pytest


import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


from httpx import AsyncClient



from app.config.settings import settings


from app.tests.utils import (
	random_email,
	random_name,
	random_lower_string,
)


from typing import (
	Dict,
)


from pydantic import (
	EmailStr,
)

from app.crud.users import users_crud

from app.schemas.user import (
	UserSchemaCreate,
	UserSchemaUpdate,
)


from pymongo import MongoClient


import datetime

import pytz



@pytest.mark.asyncio
async def test_collect_pocket_payment(
	client: AsyncClient,
	token_headers_user: Dict[str, str],
	db: MongoClient,
) -> None:
	# --

	user_in = UserSchemaCreate(
		email=settings.USER_2_EMAIL,
		username=settings.USER_2_USERNAME,
		password=settings.USER_2_PASSWORD.get_secret_value(),
		celo_address=settings.CELO_ADDRESS_3,
		active=True,
	)

	user = users_crud.create(
		db=db,
		obj_in=user_in,
	)


	# Create Pocket.
	db['main']['pockets'].insert_one({
		'user_id': str(user['_id']),
		'celo_value_amount': 1.0,
		'recipients_amount': 3,
		'txns': {},
		'generated_slug': 'abc123',
		'created_on_datetime': datetime.datetime.now(pytz.utc),
	})

	print('n1n1n1')


	resp = await client.get(
		f'{settings.API_V1_STR}/_receiver/collect/abc123',
		headers=token_headers_user,
	)

	print('...!!')
	print(resp.json())

	assert resp.status_code == 200
	result = resp.json()




