from .models import Reviews

from rest_framework import serializers
from user.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)  
    class Meta:
        model = Reviews
        fields = ['id', 'user', 'type', 'star', 'content', 'created_at']
