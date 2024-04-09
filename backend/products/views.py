from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Product
from rest_framework.views import APIView
from .serializers import OrderSerializer, OrderItemSerializer, ProductSerializer
from .models import Order, Orderitem

@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_items': '/',
        'Search by Category': '/?category=category_name',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/item/pk/delete',
    }
 
    return Response(api_urls)

@api_view(['POST'])
def add_items(request):

    item = ProductSerializer(data=request.data)
 
    if item.is_valid():
        item.save()
        return Response({"message": "Product Added", "status":status.HTTP_200_OK})
    else:
        return Response({"message": "hi", "status":status.HTTP_400_BAD_REQUEST})
    
@api_view(['GET'])
def view_items(request):
     
     
    # checking for the parameters from the URL
    if request.query_params:
        items = Product.objects.filter(**request.query_params.dict())
    else:
        items = Product.objects.all()
 
    # if there is something in items else raise error
    if items:
        serializer = ProductSerializer(items, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['PATCH'])
def update_items(request, pk):
    print("Received primary key:", pk)  # Print the received primary key for debugging

    try:
        item = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product matching query does not exist."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(instance=item, data=request.data)
 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_items(request, pk):
    item = get_object_or_404(Product, pk=pk)
    item.delete()
    return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def get_product_by_id(request, pk):
    item = get_object_or_404(Product, pk=pk)

    if item:
        serializer = ProductSerializer(item)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def PlaceOrder(request, format=None):
        serializer = OrderSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def GetAllOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def GetOrderItemsByOrderID(request, orderID):
    try:
        order_items = Orderitem.objects.filter(order_id=orderID)
        serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Orderitem.DoesNotExist:
        return Response({"message": "Order items not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def GetOrderByUserID(request, userID):
    try:
        orders = Order.objects.filter(user_id=userID)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({"message": "Orders not found for the user"}, status=status.HTTP_404_NOT_FOUND)