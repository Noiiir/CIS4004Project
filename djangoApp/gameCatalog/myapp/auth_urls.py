from django.urls import path
from . import views

urlpatterns = [
    path('protected/', views.protected_route, name='protected'),
    # Add more authentication-related endpoints as needed
]