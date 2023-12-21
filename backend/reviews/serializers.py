# reviews/serializers.py
from rest_framework import serializers
from .models import ProductsModel, ImageModel

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsModel
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = '__all__'

