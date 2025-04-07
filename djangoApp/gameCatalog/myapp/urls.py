from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("add/", views.add_data, name="add_data"),
    path("choice/", views.choice, name="choice"),
    path("consoles/", views.consoles_peripherals, name="consoles_peripherals"),
    path("create-console/", views.create_console, name="create_console"),
    path("database-display/", views.database_display, name="database_display"),
    path("signup/", views.database_signup, name="database_signup"),
    path("database/", views.database_functionality, name="database_functionality"),
    path("game-copies/", views.game_copies, name="game_copies"),
]
