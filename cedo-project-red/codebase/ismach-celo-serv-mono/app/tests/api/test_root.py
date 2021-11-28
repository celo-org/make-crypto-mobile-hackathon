import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


from typing import Dict


from httpx import AsyncClient

from app.config.settings import settings

import pytest




@pytest.mark.asyncio
async def test_root(
	client: AsyncClient,
) -> None:
	# Test Root!

	resp = await client.get(
		'/',
	)
	result = resp.json()
	
	assert resp.status_code == 200


