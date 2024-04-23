from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import views as auth_views
from .views import PetViewSet
from rest_framework.routers import DefaultRouter

from .views import (
#     OTPEmailVerification,
    TokenObtainPairView,
    UserRegistrationView,
    change_password,
    reset_password_email,
    ResetPassword,
    VerifyOTP
    
    # PetListCreateAPIView,
    # PetDetailAPIView,
)

from .views import UserProfileImageView

router = DefaultRouter()
router.register(r'pets', PetViewSet, basename='pet')#/pets/?user_id=<user_id>, where <user_id> is the ID of the user whose pets you want to retrieve.

app_name = "user"

urlpatterns = [
    path('', include(router.urls)),
    path("registration/", UserRegistrationView.as_view(), name="registration"),
    path("jwt/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('change-password/<int:userID>/', change_password, name='change_password'),
    path('reset-password-email/', reset_password_email, name='reset_password_email'),
    path('reset-password/', ResetPassword.as_view(), name='resetpassword'),
    path('users/<int:user_id>/profile-image/', UserProfileImageView.as_view(), name='user-profile-image'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify_otp'),
    path('pets/by_user/<int:user_id>/', PetViewSet.as_view({'get': 'list_pets_by_user_id'}), name='pets_by_user'),



]
