from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import views as auth_views
from .views import (
#     OTPEmailVerification,
    TokenObtainPairView,
    UserRegistrationView,
    change_password,
    reset_password_email,
    ResetPassword,
    getProfile,
    updateProfile,
    # PetListCreateAPIView,
    # PetDetailAPIView,
)

app_name = "user"

urlpatterns = [
    path("registration/", UserRegistrationView.as_view(), name="registration"),
#     path("verify-otp-code/", OTPEmailVerification.as_view(), name="verify_email"),
    path("jwt/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path('password-reset/', reset_password_request_token, name='reset_password_request'),
    # path('password-reset/confirm/<str:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
    path('change-password/', change_password, name='change_password'),
    path('reset-password-email/', reset_password_email, name='reset_password_email'),
    # path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('reset-password/', ResetPassword.as_view(), name='resetpassword'),
    #Profile
    path('profile/', getProfile, name='profile'),
    path('profile/update/', updateProfile, name='update-profile'),

    #donation
    # path('profile/update/', , name='update-profile'),


#     path(
#         "resend/verification-code/",
#         ResendVerificaitonEmailView.as_view(),
#         name="resend_verification_email",
#     ),
#     path("change-password/", PasswordChangeView.as_view(), name="change_password"),
]
