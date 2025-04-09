from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Console, Game
from .serializers import ConsoleSerializer, GameSerializer
import jwt
from django.conf import settings

class ConsoleViewSet(viewsets.ModelViewSet):
    queryset = Console.objects.all()
    serializer_class = ConsoleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = ConsoleSerializer(queryset, many=True)
        return Response(serializer.data)

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

    def list(self, request):
        console_id = request.query_params.get('console', None)
        if console_id:
            queryset = self.queryset.filter(console_id=console_id)
        else:
            queryset = self.queryset.all()
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)
