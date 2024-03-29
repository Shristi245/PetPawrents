from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters
from drf_spectacular.utils import extend_schema
from rest_framework import status

from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user.models import User
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from user.models import Pet
from user.serializers import ChangePasswordSerializer, ResetPasswordEmailSerializer


from rest_framework.generics import (
    CreateAPIView,

)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer

from django.contrib.auth.models import User


from .serializers import (
    # PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    # PasswordResetSerializer,
    # ResendEmailVerificationCodeSrializer,
    TokenObtainPairSerializer,
    ChangePasswordSerializer,
    # ProfileSerializer,
    PetSerializer,
    # ResetPasswordEmailSerializer,
    UserRegistrationSerializer,
    UserSerializer,
    # VerirfyOtpSerializer,
)



# from rest_framework.throttling import ScopedRateThrottle

sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        "password", "old_password", "new_password1", "new_password2"
    )
)


class UserRegistrationView(CreateAPIView):
    """
    Creates user with given email and send 4 digit verification code.
    """

    serializer_class = UserRegistrationSerializer
    permission_classes = ()

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"detail": _("Verification email sent.")},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class TokenObtainPairView(CreateAPIView):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials and email_verified status.
    """

    serializer_class = TokenObtainPairSerializer
    permission_classes = ()

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    @extend_schema(request=TokenObtainPairSerializer)
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    




class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

# class PetListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Pet.objects.all()
#     serializer_class = PetSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# class PetDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Pet.objects.all()
#     serializer_class = PetSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        # Check old password
        if not request.user.check_password(serializer.validated_data.get("old_password")):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        # set_password also hashes the password that the user will get
        request.user.set_password(serializer.validated_data.get("new_password"))
        request.user.save()
        # Keep the user logged in after changing the password
        update_session_auth_hash(request, request.user)
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()  # Get the custom user model

@api_view(['POST'])
def reset_password_email(request):
    serializer = ResetPasswordEmailSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            serializer.errors['email'] = ['User with this email does not exist.']
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Generate reset link
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:3000/confirm-password?token={token}"

        # Send email with reset link
        email_subject = "Password Reset Request"
        email_body = render_to_string('password_reset_email.txt', {'reset_link': reset_link})
        send_mail(email_subject, email_body, None, [email])

        return Response({"detail": "Password reset link sent successfully"}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        
class ResetPassword(APIView):
    def post(self,request):

        serializer = PasswordResetConfirmSerializer(data=request.data)


        token = request.data.get("token");

        print(serializer.is_valid())

        if serializer.is_valid() and token:
            user = User.objects.get(email = request.data.get('email'))

            if user is not None and default_token_generator.check_token(user, request.data.get("token")):
                password = serializer.validated_data['new_password1']
                user.set_password(password)
                user.save()

                return Response({"detail": "Password has been reset with the new password."}, status=status.HTTP_200_OK)
            
            return Response({"detail": "User not found or token is invalid."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"detail":"Email or Password or Token is not valid"}, status=status.HTTP_400_BAD_REQUEST)
