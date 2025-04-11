import json
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from myapp.models import Item
from myapp.serializers import (
    UserSerializer,
    ItemSerializer,
    FilterItemInputSerializer,
)
from django.contrib.auth import authenticate
from django.db.models import Q

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
        
class UserItemsView(APIView):
    """
        Retrieve all items related to a specific user.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        # DRF automatically parses JSON and places it in request.data
        data = request.data

        filters = {}

        # For character fields, use a case-insensitive match if provided.
        if data.get("name", ""):
            filters["name__icontains"] = data["name"]
        if data.get("pubmanu", ""):
            filters["pubmanu__icontains"] = data["pubmanu"]
        if data.get("condition", ""):
            filters["condition__icontains"] = data["condition"]

        # For integer fields, check if value is not -1.
        if data.get("category", -1) != -1:
            filters["category"] = data["category"]
        if data.get("year", -1) != -1:
            filters["year"] = data["year"]
        if data.get("quantity", -1) != -1:
            filters["quantity"] = data["quantity"]
        if data.get("price", -1) != -1:
            filters["price"] = data["price"]
        if data.get("userid", -1) != -1:
            filters["userid"] = data["userid"]

        queryset = Item.objects.filter(**filters)
        items_list = list(queryset.values())

        return Response(items_list, status=status.HTTP_200_OK)

class CreateItemView(APIView):
    """
        Add an item to the database
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ItemSerializer(data = request.data)
        serializer.is_valid()
        serializer.save()
        return Response({'message': 'Creation successful'}, status = status.HTTP_200_OK)

class UpdateItemView(APIView):
    """
        Update an item in the database
    """
    permission_classes = [AllowAny]
    
    def post(self, request, pk):
        try:
            item = Item.objects.get(pk = pk)
        except Item.DoesNotExist:
            return Response({'error': 'Item does not exist'}, status = status.HTTP_400_BAD_REQUEST)
        serializer = ItemSerializer(item, data = request.data, partial = True)
        serializer.is_valid()
        serializer.save()
        return Response({'message': 'Update successful'}, status = status.HTTP_200_OK)

class DeleteItemView(APIView):
    """
        Delete an item in the database
    """
    permission_classes = [AllowAny]

    def delete(self, request, pk):
        try:
            item = Item.objects.get(pk = pk)
        except Item.DoesNotExist:
            return Response({'error': 'Item does not exist'}, status = status.HTTP_400_BAD_REQUEST)
        item.delete()
        return Response({'message': 'Deletion successful'}, status = status.HTTP_200_OK)
        

class GetDjangoToken(APIView):
    """
        Get a token for the Django backend.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"Error": ""}, status=status.HTTP_200_OK)
        


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
    items = Item.object.filter(user_id=request.user.id)
    return render(request, "DatabaseDisplayTemplate.html", {'items': items})

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
