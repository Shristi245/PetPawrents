from rest_framework import serializers
from .models import  Product, Order, Orderitem
from user.serializers import UserSerializer



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title', 'price', 'category', 'image', 'description']

    def validate(self, data):   

        title = data.get("title")
        category = data.get("category")
        price = data.get("price")
        image = data.get("image")


        if(price < 0):
            raise serializers.ValidationError("Price cannot be negative")
        
        if not title or not category or not price or not image:
            raise serializers.ValidationError("title, ctageory, image, price are required")

        return data



class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False)

    class Meta:
        model = Orderitem
        fields = [ 'product', 'quantity', 'order']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'paid_amount', 'order_items']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')

        order = Order.objects.create(**validated_data)  
        for order_item_data in order_items_data:
            Orderitem.objects.create(order=order, **order_item_data)
           
        return order

class GetOrderItemDetailsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Orderitem
        fields = [ 'product', 'quantity', 'order']

class GetAllOrderDetailSerializer (serializers.ModelSerializer):
    user = UserSerializer()
    order_items = GetOrderItemDetailsSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'paid_amount', 'order_items']