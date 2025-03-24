from django.shortcuts import render

def home(request):
    return render(request, "home.html")

def add_data(request):
    return render(request, "addData.html")

def choice(request):
    return render(request, "Choice.html")

def consoles_peripherals(request):
    return render(request, "ConsolesPeripherals.html")

def create_console(request):
    return render(request, "CreateConsole.html")

def database_display(request):
    return render(request, "DatabaseDisplayTemplate.html")

def database_signup(request):
    return render(request, "DatabaseSignup.html")

def database_functionality(request):
    return render(request, "Databasefunctionality.html")

def game_copies(request):
    return render(request, "GameCopies.html")
