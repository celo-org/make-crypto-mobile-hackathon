from typing import Any


from fastapi import (
	BackgroundTasks,
	APIRouter,
	Depends,
	status,
	Request,
	Form,
	HTTPException,
)


from app import (
	schemas,
)

from app.crud.users import (
	users_crud,
)


from app.api import deps



from app.security import (
	create_access_token,
)


from app.extensions import limiter


from fastapi.security import OAuth2PasswordRequestForm


from datetime import timedelta


from app.config.settings import settings


from pymongo import MongoClient



router = APIRouter()




@router.post(
	'/access-token',
	response_model=schemas.TokenSchema,
)
@limiter.limit('20/minute')
async def login_access_token(
	request: Request,
	*,
	db: MongoClient = Depends(deps.get_db),
	form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
	# Login for role -- ?

	user = users_crud.authenticate(
		db=db,
		username=form_data.username,
		password=form_data.password,
	)


	if not user:
		raise HTTPException(
			status_code=400,
			detail='Incorrect username or password!',
		)

	if not bool(user['active']):
		raise HTTPException(
			status_code=400,
			detail='Inactive account!',
		)

	# --
	access_token_expires = timedelta(
		minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
	)

	return {
		'access_token': create_access_token(
			str(user['_id']),
			expires_delta=access_token_expires,
		),
		'token_type': 'bearer',
	}



# Test token --

@router.post(
	'/test-token',
	response_model=schemas.UserSchema,
)
async def test_token(
	current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
	# --

	return current_user



