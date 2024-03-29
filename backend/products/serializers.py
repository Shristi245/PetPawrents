from rest_framework import serializers
from .models import Cart, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title', 'price', 'category', 'image']

    def validate(self, data):

        title = data.get("title")
        category = data.get("category")
        price = data.get("price")
        image = data.get("image")

        print("idsuc",not title or not category or not price or not image)

        if(price < 0):
            raise serializers.ValidationError("Price cannot be negative")
        
        if not title or not category or not price or not image:
            raise serializers.ValidationError("title, ctageory, image, price are required")

        return data



