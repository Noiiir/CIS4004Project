from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from myapp.models import Item, User
from django.contrib.auth import authenticate
from myapp.serializers import (
    UserSerializer,
    ItemSerializer,
)

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
        if not serializer.is_valid():
            return Response({"Error": "Malformed JSON submitted", "details": serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
        
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
    
class CreateUserView(APIView):
    """
        Create a new user.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetUserById(APIView):
    """
        Get a user by ID.
    """
    permission_classes = [AllowAny]

    def get(self, request, userid):
        try:
            user = User.objects.get(userid=userid)
            serializer = UserSerializer(user)
            return Response({"UserPK": user.pk}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
class GetItemById(APIView):
    """
        Get an item by ID.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        request_data = request.data
        pk = request_data.get('pk', None)
        usedId = request_data.get('userid', None)
        try:
            item = Item.objects.get(pk=pk, userid=usedId)
            serializer = ItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_route(request):
    return Response({
        'message': 'You have accessed a protected endpoint',
        'user_id': request.user.username
    })
