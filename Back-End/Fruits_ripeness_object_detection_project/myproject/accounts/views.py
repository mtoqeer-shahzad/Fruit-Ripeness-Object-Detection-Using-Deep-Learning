
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from .models import CustomUser

from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserSerializer
)



# User Registration API (POST)
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)

            return Response(
                {'token': token.key},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# User Login API (POST)
class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            token, _ = Token.objects.get_or_create(user=user)

            role = "admin" if user.is_staff else "user"

            return Response({
                "message": "Login successful",
                "role": role,
                "token": token.key
            }, status=status.HTTP_200_OK)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# Get All Users (GET)
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# Get a Single User by ID (GET)
class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# Update User (PUT/PATCH)
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    data = request.data

    if 'username' in data:
        user.username = data['username']

    if 'email' in data:
        user.email = data['email']

    if 'is_active' in data:
        user.is_active = data['is_active']

    user.save()

    return Response(
        {'message': 'User updated successfully'},
        status=status.HTTP_200_OK
    )


# Delete User (DELETE)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    user.delete()

    return Response(
        {'message': f'User with ID {user_id} deleted successfully'},
        status=status.HTTP_200_OK
    )
