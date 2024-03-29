from rest_framework import serializers
from .models import Adopt

class AdoptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adopt
        fields = ['name', 'description', 'image', 'updated_date']

    def validate(self, data):

        name = data.get("name")
        description = data.get("description")
        updated_date = data.get("updated_date")
        image = data.get("image")

        print("idsuc",not name or not updated_date or not description or not image)

        if not image:
            raise serializers.ValidationError("Please upload an image")
        
        if not name or not description or not image:
            raise serializers.ValidationError("name, description, image are required")

        return data