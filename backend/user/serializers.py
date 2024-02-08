
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
from rest_framework import serializers
from user.models import AppUser
import random

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
          # These are claims, you can add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['phone_number']= user.phone_number
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        # ...
        return token
            
    

# user Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = '__all__'
    

class RegisterSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=AppUser.objects.all())]
    #         )

    password = serializers.CharField(
        write_only=True,
        min_length = settings.MIN_PASSWORD_LENGTH,
        required=True, 
        error_messages = {"min_length":f"Password must be longer than {settings.MIN_PASSWORD_LENGTH} characters"},
    )
        

    password2 = serializers.CharField(
        write_only=True,
        min_length = settings.MIN_PASSWORD_LENGTH,
        required=True, 
        error_messages = {"min_length":f"Password must be longer than {settings.MIN_PASSWORD_LENGTH} characters"},
    )

    class Meta:
        model = AppUser
        fields = ('username', 'email', 'phone_number', 'password', 'password2')
        

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match"})
        return data

    def create(self, validated_data):
        otp = random.randint(1000, 9999)
        user = AppUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number = validated_data['phone_number'],
            otp = otp
        )

        
        user.set_password(validated_data['password'])
        user.generate_and_send_otp()  # Generate and send OTP after user creation
        return user