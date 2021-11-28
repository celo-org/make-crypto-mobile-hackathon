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






