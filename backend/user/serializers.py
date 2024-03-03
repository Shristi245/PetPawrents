# from io import BytesIO

# import jwt
# import requests
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.signals import user_logged_in
from django.contrib.auth.tokens import default_token_generator
# from django.core import files
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes

from user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "is_staff", "is_superuser"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    # Add otp_code field if needed
    # otp_code = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "username", "mobile", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        # Extract fields from data

        email = data.get("email")
        password = data.get("password")
        mobile = data.get("mobile")


        # Check if email is already registered
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "This email has already been registered."})

        # Validate password if provided
        if password:
            user = User(email=email)
            try:
                validate_password(password=password, user=user)
            except serializers.ValidationError as e:
                raise serializers.ValidationError({"password": e.messages})

        # Check if mobile field is provided and is unique if present
        if mobile and User.objects.filter(mobile=mobile).exists():
            raise serializers.ValidationError({"mobile": "This mobile number has already been registered."})

        return data

    def create(self, validated_data):
        
        password = validated_data.pop("password")
        # Create user object
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            mobile=validated_data['mobile'],
        )  # Create inactive user

        user.set_password(password)
        user.save()
        return user
    

class TokenObtainPairSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email/Mobile"))
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        is_email = True if "@" in email else False

        if email and password:
            user = authenticate(
                request=self.context.get("request"), username=email, password=password
            )
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
            # if is_email and not user.email_verified:
            #     msg = _("Email is not verified. New verification code has been sent.")
            #     send_email_verification_code(self.context.get("request"), user)
            #     raise serializers.ValidationError(
            #         {"detail": msg, "email_verified": False}, code="authorization"
            #     )
        else:
            msg = _('Must include "email/mobile" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        refresh = self.get_token(user)
        response = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "is_staff": user.is_staff,
        }
        request = self.context["request"]
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        return response

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)
    

class PasswordResetSerializer(serializers.Serializer):
    """Serializer for requesting a password reset e-mail."""

    email = serializers.EmailField()

    def validate_email(self, value):
        # Validate email and create PasswordResetForm instance
        self.reset_form = PasswordResetForm(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)

        return value

    def send_email(self, reset_link):
        request = self.context.get("request")
        # Construct email parameters
        email_subject = "Password Reset"
        email_body = render_to_string('password_reset_email.html', {'reset_link': reset_link})
        email = EmailMessage(subject=email_subject, body=email_body, to=[self.validated_data['email']])
        email.send()

    def save(self):
        # Generate reset link
        user = self.reset_form.get_users(self.validated_data['email'])
      
        print("------------------")
        print(str(user))
        print("------------------")

        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = default_token_generator.make_token(user)
        reset_link = f"http://127.0.0.1:8000/password-reset/confirm/{uid}/{token}/"

        # Send email with reset link
        self.send_email(reset_link)

class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)
    uid = serializers.CharField()
    token = serializers.CharField()

    set_password_form_class = SetPasswordForm

    def validate(self, attrs):
        self._errors = {}

        # Decode the uidb64 to uid to get User object
        try:
            uid = force_str(urlsafe_base64_decode(attrs["uid"]))
            self.user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise ValidationError({"uid": ["Invalid value"]})

        # Construct SetPasswordForm instance
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        if not default_token_generator.check_token(self.user, attrs["token"]):
            raise ValidationError({"token": ["Invalid value"]})

        return attrs

    def save(self):
        return self.set_password_form.save()


