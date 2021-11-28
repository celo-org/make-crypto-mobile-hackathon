from typing import (
	Any,
	List,
	Optional,
)

from fastapi import (
	APIRouter,
	Depends,
	Request,
	HTTPException,
)

from app.api import deps


from app import schemas


from app.config.settings import settings


from app.extensions import limiter


from bson import ObjectId


from pymongo import MongoClient



router = APIRouter()


import string

import random


import datetime

import pytz


from app.utils.celo import kit, gold_token






def generator(size=8, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
	# --

	return ''.join(random.choice(chars) for _ in range(size))




@router.post(
	'/pockets',
)
async def create_pocket(
	request: Request,
	*,
	db: MongoClient = Depends(deps.get_db),
	user: Any = Depends(deps.get_current_active_user),
	pocket_in: schemas.PocketSchemaCreate,
) -> Any:
	# --

	try:
		balance = gold_token.balance_of(settings.CELO_ADDRESS_1)
		print(balance)
	except:
		raise HTTPException(
			status_code=500,
			detail='Not working!',
		)

	if balance < kit.w3.toWei(pocket_in.celo_value_amount, 'ether'):
		raise HTTPException(
			status_code=500,
			detail='Not enough balance!',
		)

	try:
		kit.wallet_gas_price = 500000000
		kit.wallet_add_new_key = settings.CELO_ADDRESS_PRIVATE_KEY_1.get_secret_value()
		# kit.wallet_add_new_key = settings.CELO_ADDRESS_PRIVATE_KEY_2.get_secret_value()
		# kit.wallet.sign_with_provider = True
		kit.wallet_change_account = settings.CELO_ADDRESS_1
		print('1z')
		celo_amount = kit.w3.toWei(pocket_in.celo_value_amount, 'ether')
		print('NNNN')
		print(celo_amount)
		print('2z')
		tx_hash = gold_token.transfer(settings.CELO_ADDRESS_2, celo_amount)
		print('3z')
	except Exception as err:
		print('ggg')
		print(err)
		print(type(err))
		raise HTTPException(
			status_code=500,
			detail='Not working!',
		)

	print('tx_hash')
	print(tx_hash)

	pocket_in.initial_txn = tx_hash
	pocket_in.txns = {}


	pocket_in.created_on_datetime = datetime.datetime.now(pytz.utc)

	slug = generator()
	pocket_in.generated_slug = slug

	db['main']['pockets'].insert_one(pocket_in.dict())


	return {
		'link': f'{slug}',
	}





