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


from pymongo import MongoClient


@pytest.mark.asyncio
async def test_create_pocket(
	client: AsyncClient,
	token_headers_user: Dict[str, str],
	db: MongoClient,
) -> None:
	# --

	# get user_id somehow...
	user = db['main']['users'].find_one({})

	data = {
		'user_id': str(user['_id']),
		'celo_value_amount': 1.5,
		'recipients_amount': 4,
		'txns': {},
	}

	resp = await client.post(
		f'{settings.API_V1_STR}/_sender/pockets',
		json=data,
		headers=token_headers_user,
	)

	print('...!??')
	print(resp.json())

	assert resp.status_code == 200
	result = resp.json()

	assert True




