from django.shortcuts import render

# Create your views here.
# reviews/views.py
from rest_framework import viewsets
from reviews.models import ProductsModel, ImageModel
from .serializers import ProductSerializer, ImageSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = ImageModel.objects.all()
    serializer_class = ImageSerializer
