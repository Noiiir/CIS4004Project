from rest_framework import serializers
from .models import User
from .models import Item

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class FilterItemInputSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, allow_blank=True)
    category = serializers.IntegerField(required=False)
    pubmanu = serializers.CharField(required=False, allow_blank=True)
    year = serializers.IntegerField(required=False)
    quantity = serializers.IntegerField(required=False)
    condition = serializers.CharField(required=False, allow_blank=True)
    price = serializers.IntegerField(required=False)
    userid = serializers.IntegerField(required=False)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'userid']