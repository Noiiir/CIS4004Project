from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from myapp.models import Item
from myapp.serializers import UserSerializer
from myapp.serializers import ItemSerializer
from django.contrib.auth import authenticate

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [AllowAny]
        
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password, email=email)
        user.first_name = request.data.get('first_name', '')
        user.last_name = request.data.get('last_name', '')
        user.save()
        
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

class LoginViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username = username, password = password)

        if user is not None:
            return Response({
                'message': 'Login successful!',
                'id': user.id
            })
        else:
            return Response({'error': "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_route(request):
    return Response({
        'message': 'You have accessed a protected endpoint',
        'user_id': request.user.username
    })
