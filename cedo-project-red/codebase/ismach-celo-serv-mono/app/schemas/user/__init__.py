from typing import (
	Optional,
	Any,
)

from pydantic import (
	BaseModel,
	EmailStr,
	validator,
	Field,
)




class UserSchemaBase(BaseModel):
	email: Optional[EmailStr] = None
	username: Optional[str] = None
	celo_address: Optional[str] = None
	password: Optional[str] = None
	active: Optional[bool] = None



class UserSchemaCreate(
	UserSchemaBase,
):
	password: str


class UserSchemaUpdate(
	UserSchemaBase,
):
	pass


class UserSchemaInDBBase(
	UserSchemaBase,
):
	# id: str

	class Config:
		# fields = {'id': '_id'}
		pass



class UserSchema(
	UserSchemaInDBBase,
):
	pass
	



class UserSchemaInDB(
	UserSchemaInDBBase,
):
	password_hash: str





