from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.signals import user_logged_in
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from user.models import Pet
from user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "username", "mobile", "password", "user_type", "bio", "image", "address" ]

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
            "user_type": user.user_type,
            "id": user.id,
        }
        request = self.context["request"]
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        return response

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)
    

class ImageUrlField(serializers.Field):
    def to_representation(self, value):
        if value:
            if isinstance(value, str):
                return value  # If it's already an image URL
            else:
                return value.url  # If it's a file object
        return None

    def to_internal_value(self, data):
        return data  # Assuming the URL is passed directly
    
class UserProfileImageSerializer(serializers.ModelSerializer):
    image = ImageUrlField()

    class Meta:
        model = User
        fields = ['image']

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password=serializers.CharField(required=True)


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


    
class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length =100)
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)
  
    

    def validate(self, attrs):
        attrs = super().validate(attrs)
        new_password1 = attrs.get("new_password1")
        new_password2 = attrs.get("new_password2")

        if new_password1 != new_password2:
            raise ValidationError({"new_password2": _("The two password fields didn't match.")})
        
   
        return attrs


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

class VerifyAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        email = data.get('email')
        otp = data.get('otp')

        # Perform additional validation if needed
        if not email or not otp:
            raise serializers.ValidationError("Email and OTP are required fields.")

        return data
