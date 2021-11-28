import random

import string

from typing import Dict


from fastapi.testclient import TestClient

from app.config.settings import settings


import random

import math


from faker import Faker


fake = Faker()





def random_lower_string() -> str:
	return "".join(random.choices(string.ascii_lowercase, k=32))



def random_email() -> str:
	return fake.email()



def random_name() -> str:
	return fake.name()



def random_address() -> str:
	return fake.address()



def random_number(min_digits: int = 6, max_digits: int = 6) -> int:
	return random.randint(math.pow(10, min_digits), math.pow(10, max_digits + 1) - 1)



