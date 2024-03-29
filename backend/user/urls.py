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
    
    # PetListCreateAPIView,
    # PetDetailAPIView,
)

router = DefaultRouter()
router.register(r'pets', PetViewSet)

app_name = "user"

urlpatterns = [
    path('', include(router.urls)),
    path("registration/", UserRegistrationView.as_view(), name="registration"),
    path("jwt/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('change-password/', change_password, name='change_password'),
    path('reset-password-email/', reset_password_email, name='reset_password_email'),
    # path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('reset-password/', ResetPassword.as_view(), name='resetpassword'),
    #Profile
    # path('profile/', ProfileDetailView.as_view(), name='profile-detail'),
    # path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    # path('profile/create/', ProfileCreateView.as_view(), name='profile-create'),
    # path('profile/delete/', ProfileDeleteView.as_view(), name='profile-delete'),

    #donation
    # path('profile/update/', , name='update-profile'),


#     path(
#         "resend/verification-code/",
#         ResendVerificaitonEmailView.as_view(),
#         name="resend_verification_email",
#     ),
#     path("change-password/", PasswordChangeView.as_view(), name="change_password"),
]
