from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reviews
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from user.models import User
from rest_framework.permissions import IsAuthenticated


from .serializers import ReviewSerializer

@api_view(['POST'])
def create_review(request):
    if 'type' not in request.data or 'star' not in request.data or 'content' not in request.data:
        return Response({"error": "Type, star, and content are required fields."}, status=status.HTTP_400_BAD_REQUEST)
    
    user_id = request.data.get(User, request.user.id)
    request.data[User] = user_id
    
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def list_reviews(request):
    reviews = Reviews.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def retrieve_review(request, pk):
    try:
        review = Reviews.objects.get(pk=pk)
    except Reviews.DoesNotExist:
        return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewSerializer(review)
    return Response(serializer.data)

@api_view(['PUT'])
def update_review(request, pk):
    try:
        review = Reviews.objects.get(pk=pk)
    except Reviews.DoesNotExist:
        return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ReviewSerializer(review, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_review(request, pk):
    try:
        review = Reviews.objects.get(pk=pk)
    except Reviews.DoesNotExist:
        return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
    review.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


