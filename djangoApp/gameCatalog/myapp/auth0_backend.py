import json
import jwt
import requests
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions
from functools import lru_cache

User = get_user_model()

class Auth0Authentication(authentication.BaseAuthentication):
    def __init__(self):
        self.domain = settings.AUTH0_DOMAIN
        self.audience = settings.AUTH0_AUDIENCE

    @lru_cache(maxsize=1)
    def get_jwks(self):
        """Fetch and cache the JWKS from Auth0"""
        jwks_url = f'https://{self.domain}/.well-known/jwks.json'
        try:
            response = requests.get(jwks_url)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise exceptions.AuthenticationFailed(f'Failed to fetch JWKS: {str(e)}')

    def get_signing_key(self, kid):
        """Get the signing key from JWKS"""
        jwks = self.get_jwks()
        for key in jwks.get('keys', []):
            if key.get('kid') == kid:
                return jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))
        raise exceptions.AuthenticationFailed('No matching signing key found')

    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            # Extract the token
            auth_parts = auth_header.split()
            if len(auth_parts) != 2 or auth_parts[0].lower() != 'bearer':
                raise exceptions.AuthenticationFailed('Invalid authorization header')
            token = auth_parts[1]

            # Get the unverified header to fetch the key ID (kid)
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get('kid')
            if not kid:
                raise exceptions.AuthenticationFailed('No key ID in token header')

            # Get the signing key
            signing_key = self.get_signing_key(kid)

            # Verify and decode the token
            payload = jwt.decode(
                token,
                key=signing_key,
                algorithms=['RS256'],
                audience=self.audience,
                issuer=f'https://{self.domain}/',
            )

            # Get or create the user
            sub = payload['sub']
            user, created = User.objects.get_or_create(
                username=sub,
                defaults={
                    'email': payload.get('email', ''),
                    'first_name': payload.get('given_name', ''),
                    'last_name': payload.get('family_name', ''),
                    'is_active': True
                }
            )

            # Update user info if not newly created
            if not created and payload.get('email'):
                user.email = payload['email']
                user.first_name = payload.get('given_name', '')
                user.last_name = payload.get('family_name', '')
                user.save()

            return (user, token)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError as e:
            raise exceptions.AuthenticationFailed(f'Invalid token: {str(e)}')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')

    def authenticate_header(self, request):
        """Return the authentication header format"""
        return 'Bearer realm="API"'

