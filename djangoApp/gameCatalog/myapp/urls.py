from django.urls import path
from django.urls import include
from rest_framework import routers
from .views import (
    UserViewSet,
    ItemViewSet,
    LoginViewSet,
    RegisterView,
    UserItemsView,
    GetDjangoToken,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user-api')
router.register(r'items', ItemViewSet, basename='item-api')

urlpatterns = [
    path('api/getUserItems/', UserItemsView.as_view(), name='get_user_items'),
    path('api/', GetDjangoToken.as_view(), name='get_django_token'),
]
