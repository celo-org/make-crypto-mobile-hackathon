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


from app import schemas


from app.api import deps


from app.config.settings import settings


from app.extensions import limiter


from pymongo import MongoClient


import datetime


import pytz



router = APIRouter()



from app.utils.celo import kit, gold_token






@router.get(
	'/collect/{slug}',
)
async def collect_pocket_payment(
	request: Request,
	*,
	db: MongoClient = Depends(deps.get_db),
	user: Any = Depends(deps.get_current_active_user),
	slug: str,
) -> Any:
	# --

	pocket = db['main']['pockets'].find_one(
		{'generated_slug': slug}
	)

	print(pocket)

	if not pocket:
		raise HTTPException(
			status_code=404,
			detail='Pocket not found!',
		)

	if str(user['_id']) in pocket['txns'].keys():
		if bool(pocket['txns'][str(user['_id'])]):
			return {
				'amount': pocket['txns'][str(user['_id'])],
			}


	if len(pocket['txns']) >= pocket['recipients_amount']:
		raise HTTPException(
			status_code=500,
			detail='Not in time!',
		)



	pocket['txns'][str(user['_id'])] = ''
	new_pocket_txns = { "$set": {'txns': pocket['txns']} }


	db['main']['pockets'].update_one(
		{'generated_slug': slug},
		new_pocket_txns
	)


	number_of_already_recipients = len(pocket['txns'])


	a_b = (pocket['celo_value_amount'] / pocket['recipients_amount'])


	time_delta = (datetime.datetime.now() - pocket['created_on_datetime'])
	total_seconds = time_delta.total_seconds() + (240*60)
	minutes = total_seconds / 60


	print('minutes')
	print(minutes)

	celo_value_amount = a_b * (minutes / 60)

	print('MMMAO')
	print(celo_value_amount)


	# if (number_of_already_recipients + 1) == (pocket['recipients_amount']):
	# 	already_celo_value_amount = 0
	# 	for k, v in pocket['txns'].items():
	# 		already_celo_value_amount += 1
	# 		pass



	# celo_value_amount = pocket['celo_value_amount'] * 0.5

	# rewards = {}

	# for n in range(pocket_in.recipients_amount):
	# 	rewards[n+1] = 


	# pocket_in.rewards = {

	# }

	# A = total amount
	# B = number of recipients

	# Recipients 1 to (B-1) receive: A/B*minutes/60
	# Last recipient receives A – Sum of Amounts of recipients 1 to (B-1).



	try:
		kit.wallet_gas_price = 500000000
		# kit.wallet_add_new_key = settings.CELO_ADDRESS_PRIVATE_KEY_1.get_secret_value()
		kit.wallet_add_new_key = settings.CELO_ADDRESS_PRIVATE_KEY_2.get_secret_value()
		# kit.wallet.sign_with_provider = True
		kit.wallet_change_account = settings.CELO_ADDRESS_2
		celo_amount = kit.w3.toWei(celo_value_amount, 'ether')
		print('UUU')
		print(celo_amount)
		print('JJJW')
		balance = gold_token.balance_of(settings.CELO_ADDRESS_2)
		print(balance)
		tx_hash = gold_token.transfer(settings.CELO_ADDRESS_3, celo_amount)
	except Exception as err:
		print('errrrr::')
		print(err)
		raise HTTPException(
			status_code=500,
			detail='Error sending payment!',
		)

	
	pocket['txns'][str(user['_id'])] = celo_value_amount
	new_pocket_txns = { "$set": {'txns': pocket['txns']} }


	db['main']['pockets'].update_one(
		{'generated_slug': slug},
		new_pocket_txns,
	)


	return {
		'amount': celo_value_amount,
	}







