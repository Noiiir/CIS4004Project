"""
Django settings for gameCatalog project.
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-_y8+1!)($#_yx1+2^yl!f%yl0$k!stb8!^j(z6w5pohs+mqq92'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',          # Add Django REST framework
    'rest_framework_simplejwt', # Add JWT support
    'corsheaders',             # Add CORS support
    'myapp'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',    # Moved to the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'myapp.auth0_backend.Auth0Authentication',  # Our custom Auth0 backend
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

# Auth0 settings
AUTH0_DOMAIN = 'dev-8fmmuf8r7dmhl7b1.us.auth0.com'
AUTH0_AUDIENCE = 'https://api.videogamedb.com'
AUTH0_CLIENT_ID = 'FoPDQ8vskgHk9R3kMeztmJrjo05690sg'

# SECURITY WARNING: In production, store these values in environment variables
# import os
# AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
# AUTH0_AUDIENCE = os.environ.get('AUTH0_AUDIENCE')
# AUTH0_CLIENT_ID = os.environ.get('AUTH0_CLIENT_ID')

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React development server
    # Add your production frontend URL when deploying
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

ROOT_URLCONF = 'gameCatalog.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'gameCatalog.wsgi.application'

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'VGC',
    #     'USER': 'django',
    #     'PASSWORD': '712f6dacbe1727f5c819f8343f9a03592ccc2ebf80c4fb59',
    #     'HOST': '138.197.100.112',
    #     'PORT': '3306',
    # }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
