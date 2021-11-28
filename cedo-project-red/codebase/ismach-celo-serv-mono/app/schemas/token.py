from typing import Optional

from pydantic import BaseModel


class TokenSchema(BaseModel):
	access_token: str
	token_type: str



class TokenSchemaPayload(BaseModel):
	sub: Optional[str] = None


