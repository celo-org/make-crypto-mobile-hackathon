import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



import pytest

import asyncio

from typing import (
	Dict,
	Generator,
)


from app.config.settings import settings


from asgi_lifespan import LifespanManager

from httpx import AsyncClient


from app.main import app


from app.tests.utils.auth import (
	authentication_token_from_username_user,
)


from app.database.testing.client import (
	mongo_client_testing,
)

from app.database.helpers import (
	reset_database,
)


from app.api.deps import get_db


from pymongo import MongoClient

# --



@pytest.fixture(scope='module')
def connection():
	# --

	yield mongo_client_testing
	mongo_client_testing.close()



@pytest.fixture(scope='function')
def db(connection):
	# --

	yield connection
	reset_database(connection, mongo_database_name='main')




@pytest.fixture(autouse=True)
def override_dependency(db: MongoClient):
	# --

	app.dependency_overrides[get_db] = lambda: db




@pytest.fixture(scope='session', autouse=True)
def event_loop():
	"""Reference: https://github.com/pytest-dev/pytest-asyncio/issues/38#issuecomment-264418154"""
	loop = asyncio.get_event_loop_policy().new_event_loop()
	yield loop
	loop.close()



@pytest.fixture()
async def client():
	async with AsyncClient(app=app, base_url='http://test') as ac, LifespanManager(app):
		yield ac



@pytest.fixture()
async def token_headers_user(
	db: MongoClient,
	client: AsyncClient,
) -> Dict[str, str]:
	# --

	username = settings.USER_1_USERNAME

	return await authentication_token_from_username_user(
		db=db,
		client=client,
		username=username,
	)


