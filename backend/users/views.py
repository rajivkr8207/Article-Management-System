from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404

class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        # Only allow the authenticated user to access their profile
        user = self.request.user
        user_id = self.kwargs.get('user_id')

        # Check if the user ID matches the logged-in user's ID
        if str(user.id) != user_id:
            return Response("You do not have permission to access this profile.", status=status.HTTP_400_BAD_REQUEST)
        return user

class AllProfileView(APIView):
    serializer_class = UserSerializer

    def get(self, request, username=None):
        if username:  # If a `username` is provided in the URL, fetch the specific user's profile
            user = get_object_or_404(User, username=username)
            serializer = self.serializer_class(user)
            # print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:  # If no `username` is provided, fetch all user profiles
            users = User.objects.all()
            serializer = self.serializer_class(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    print(request.data)  # Debugging: Check incoming data
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        return Response({'detail': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        validate_password(new_password, user)
    except ValidationError as e:
        return Response({'detail': e.messages}, status=status.HTTP_400_BAD_REQUEST)
    
    user.set_password(new_password)
    user.save()

    return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)