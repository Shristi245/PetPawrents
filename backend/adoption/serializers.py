from rest_framework import serializers
from .models import Adopt
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import AdoptedPet
from user.serializers import UserSerializer


class AdoptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adopt
        fields = ['id','name', 'description', 'image', 'updated_date', 'is_adopted']

    def validate(self, data):

        name = data.get("name")
        description = data.get("description")
        updated_date = data.get("updated_date")
        is_adopted = data.get("is_adopted")

        image = data.get("image")

        if not image:
            raise serializers.ValidationError("Please upload an image")
        
        if not name or not description or not image:
            raise serializers.ValidationError("name, description, image are required")

        return data
    
class AdoptedPetSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)  # Set read_only=True for nested serializers
    adopt = AdoptSerializer(read_only=True) 
    
    class Meta:
        model = AdoptedPet
        fields = ['id', 'adopt', 'user', 'adopted_date', 'status']