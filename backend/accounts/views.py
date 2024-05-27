from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from .models import User
from django.contrib.auth import authenticate

class UserViewSet(viewsets.ViewSet):
    basename = 'users' 
    def list(self, request):
        queryset = User.objects.all()
        serializer= UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer= UserSerializer(user)
        return Response(serializer.data)


class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email is already registered'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.create_user(email=email, password=password)
            return Response({'email': email}, status=status.HTTP_201_CREATED)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status

class LogInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            # Authentication successful
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'email': user.email,
                'username': user.username,
                'date_of_birth': user.date_of_birth,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
                'id': user.id,
            }, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        
class LogOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = RefreshToken(request.data.get('refresh_token'))
        token.blacklist()
        return Response({'message': 'Logout successful'})