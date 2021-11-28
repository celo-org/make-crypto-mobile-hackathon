import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



from datetime import (
	datetime,
	timedelta,
)

from typing import (
	Any,
	Union,
	Optional,
)


from jose import jwt

from passlib.context import CryptContext


from app.config.settings import settings





pwd_context = CryptContext(
	schemes=["bcrypt"],
	deprecated="auto",
)


ALGORITHM = 'HS256'




def create_token(
	subject: Union[str, Any],
	expires_delta: timedelta = None,
	not_before_dt: datetime = None,
) -> str:
	# Create token --

	data = {
		'sub': str(subject),
	}

	if expires_delta:
		data['exp'] = expires_delta

	if not_before_dt:
		data['nbf'] = not_before_dt


	encoded_jwt = jwt.encode(
		data,
		settings.SECRET_KEY.get_secret_value(),
		algorithm='HS256',
	)

	return encoded_jwt


def verify_token(
	token: str
) -> Optional[str]:
	# Verify Token --

	try:
		decoded_token = jwt.decode(
			token,
			settings.SECRET_KEY.get_secret_value(),
			algorithms=["HS256"],
		)
		return decoded_token["sub"]
	except jwt.JWTError:
		return None




def create_access_token(
	subject: Union[str, Any],
	expires_delta: timedelta = None,
) -> str:
	# Create Access Token --

	if expires_delta:
		expire = datetime.utcnow() + expires_delta
	else:
		expire = datetime.utcnow() + timedelta(
			minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
		)

	return create_token(
		subject=subject,
		expires_delta=expire,
	)




def generate_password_reset_token(
	email: str,
	hours: int = None,
) -> str:
	# Token --

	hours = hours or settings.EMAIL_RESET_PASSWORD_TOKEN_EXPIRE_HOURS

	delta = timedelta(
		hours=hours,
	)

	now = datetime.utcnow()
	expires = now + delta
	exp = expires.timestamp()

	return create_token(
		subject=email,
		expires_delta=exp,
		not_before_dt=now,
	)




def verify_password(
	plain_password: str,
	hashed_password: str,
) -> bool:
	# Verify PW --

	return pwd_context.verify(
		plain_password,
		hashed_password,
	)



def get_password_hash(
	password: str,
) -> str:
	# PW Hash --

	return pwd_context.hash(password)




