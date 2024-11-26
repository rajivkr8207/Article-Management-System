# urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from .views import *

urlpatterns = [
    # JWT token URLs
    path('register/', UserRegisterView.as_view(), name='register'),
    path('profile/<user_id>', ProfileView.as_view(), name='ProfileView'),
    path('change-password/', change_password, name='change_password'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/profile/', AllProfileView.as_view(), name='user-profile-list'),
    path('user/profile/<str:username>/', AllProfileView.as_view(), name='user-profile-detail'),
]

# Include router URLs