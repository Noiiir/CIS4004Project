from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
import jwt
from django.conf import settings

class Auth0Authentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization', None)
        
        if not auth_header:
            return None

        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(
                token,
                algorithms=['RS256'],
                audience='https://api.videogamedb.com',
                issuer='https://dev-8fmmuf8r7dmhl7b1.us.auth0.com/'
            )
            return (payload, token)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
