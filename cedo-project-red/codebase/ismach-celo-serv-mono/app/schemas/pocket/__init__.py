from typing import (
	Optional,
	Any,
	Dict,
)

from pydantic import (
	BaseModel,
	EmailStr,
	validator,
	Field,
)


import datetime



class PocketSchemaBase(BaseModel):
	user_id: Optional[str] = None
	celo_value_amount: Optional[float] = None
	recipients_amount: Optional[int] = None
	initial_txn: Optional[Any] = None
	txns: Optional[Dict[Any, Any]] = None # {user_id: txn_hash}
	generated_slug: Optional[str] = None
	created_on_datetime: Optional[datetime.datetime] = None
	message: Optional[str] = None
	# rewards: Optional[Any] = None



class PocketSchemaCreate(
	PocketSchemaBase,
):
	pass


class PocketSchemaUpdate(
	PocketSchemaBase,
):
	pass


class PocketSchemaInDBBase(
	PocketSchemaBase,
):
	# id: str
	pass

	# class Config:
	# 	fields = {'id': '_id'}



class PocketSchema(
	PocketSchemaInDBBase,
):
	pass
	



class PocketSchemaInDB(
	PocketSchemaInDBBase,
):
	pass





