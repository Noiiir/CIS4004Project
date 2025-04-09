from rest_framework import serializers
from .models import Console, Game

class ConsoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Console
        fields = ['id', 'name', 'manufacturer', 'release_date']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'title', 'console', 'release_date', 'publisher']
