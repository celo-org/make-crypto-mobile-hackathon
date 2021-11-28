from pydantic import BaseModel


class MsgSchema(BaseModel):
	msg: str


