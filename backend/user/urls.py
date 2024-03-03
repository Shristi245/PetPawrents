from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import views as auth_views


from .views import (
#     OTPEmailVerification,
#     PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
#     ResendVerificaitonEmailView,
    TokenObtainPairView,
    UserRegistrationView,
)

app_name = "user"

urlpatterns = [
    path("registration/", UserRegistrationView.as_view(), name="registration"),
#     path("verify-otp-code/", OTPEmailVerification.as_view(), name="verify_email"),
    path("jwt/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path(
        "password-reset/confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
#     path(
#         "resend/verification-code/",
#         ResendVerificaitonEmailView.as_view(),
#         name="resend_verification_email",
#     ),
#     path("change-password/", PasswordChangeView.as_view(), name="change_password"),
]
