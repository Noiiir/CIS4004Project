from django.urls import path
from django.urls import include
from rest_framework import routers
from .views import (
    UserViewSet,
    ItemViewSet,
    UserItemsView,
    GetDjangoToken,
    CreateItemView,
    UpdateItemView,
    DeleteItemView,
    CreateUserView,
    GetUserById,
    GetItemById,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user-api')
router.register(r'items', ItemViewSet, basename='item-api')

urlpatterns = [
    path('api/getUserItems/', UserItemsView.as_view(), name='get_user_items'),
    path('api/', GetDjangoToken.as_view(), name='get_django_token'),
    path('api/createUserItem/', CreateItemView.as_view(), name='create_user_item'),
    path('api/updateUserItem/<int:pk>/', UpdateItemView.as_view(), name='update_user_item'),
    path('api/deleteUserItem/<int:pk>/', DeleteItemView.as_view(), name='delete_user_item'),
    path('api/getAllItems/', ItemViewSet.as_view({'get': 'list'}), name='get_all_items'),
    path('api/createUser/', CreateUserView.as_view(), name='create_user'),
    path('api/getAllUsers/', UserViewSet.as_view({'get': 'list'}), name='get_all_users'),
    path('api/getUser/<str:userid>/', GetUserById.as_view(), name='get_user'),
    path('api/getItemById/', GetItemById.as_view(), name='get_item_by_id'),
]