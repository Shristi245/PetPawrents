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
from .serializers import UserProfileImageSerializer
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
    TokenObtainPairSerializer,
    ChangePasswordSerializer,
    # ProfileSerializer,
    PetSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)

from .serializers import VerifyAccountSerializer

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
        user = serializer.save()

        # Send OTP email
        verify_otp = VerifyOTP()
        if verify_otp.send_otp_via_email(user.email):
            headers = self.get_success_headers(serializer.data)
            return Response(
                {"detail": _("User registered successfully. Verification email sent.")},
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        else:
            # If OTP email sending fails, roll back user creation
            user.delete()
            raise ValidationError(_("Error sending verification email."))
        

class UserProfileImageView(APIView):
    def put(self, request, user_id, *args, **kwargs):
        user_profile = User.objects.get(id=user_id)
        serializer = UserProfileImageSerializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#generate refresh and access token
class TokenObtainPairView(CreateAPIView):

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

    def list_pets_by_user_id(self, request, user_id):
        # Get pets associated with the specified user ID
        pets = Pet.objects.filter(user_id=user_id)
        # Serialize the pets
        serializer = PetSerializer(pets, many=True)
        return Response(serializer.data)



@api_view(['POST'])
def change_password(request, userID):
    serializer = ChangePasswordSerializer(data=request.data)
    user = User.objects.get(id=userID)
    if serializer.is_valid():
        # Check old password
        if not user.check_password(serializer.validated_data.get("old_password")):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        # Check if the new password matches the confirm password
        new_password = serializer.validated_data.get("new_password")
        confirm_password = serializer.validated_data.get("confirm_password")
        if new_password != confirm_password:
            return Response({"confirm_password": ["Passwords do not match."]}, status=status.HTTP_400_BAD_REQUEST)
        # Update the password
        user.set_password(new_password)
        user.save()
       
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)
    3
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


        token = request.data.get("token")

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
    

import random 
from backend.settings import EMAIL_HOST_USER
class VerifyOTP(APIView):
    def post(self, request):
        serializer = VerifyAccountSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.data['email']
            otp = serializer.data['otp']

            user = User.objects.filter(email=email)

            if not user.exists():
                print("User does not exist")
                return Response("Invalid Email!", status=400)

            if user.first().otp != otp:
                print("Invalid OTP")
                return Response("Invalid OTP!", status=400)

            user.update(is_verified=True)
            return Response("Account Verified", status=200)

        return Response(serializer.errors, status=400)

    def send_otp_via_email(self, email):
        subject = 'Your account verification email'
        otp = random.randint(1000, 9999)
        message = f'Your OTP is {otp}'
        email_from = EMAIL_HOST_USER
            
        try:
            send_mail(subject, message, email_from, [email])
            user_obj = User.objects.get(email=email)
            user_obj.otp = otp
            user_obj.save()
            return True
        except Exception as e:
            print(e)
            return False

