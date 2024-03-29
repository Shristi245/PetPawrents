from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Adopt
from .serializers import AdoptSerializer

@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_details': '/',
        'Add': '/add',
        'Update': '/update/pk',
        'Delete': '/adoption/pk/delete'
    }
 
    return Response(api_urls)

@api_view(['POST'])
def add_details(request):

    adoption = AdoptSerializer(data=request.data)
 
    if adoption.is_valid():
        adoption.save()
        return Response({"message": "Adoption Details Added", "status":status.HTTP_200_OK})
    else:
        return Response({"message": "not working", "status":status.HTTP_400_BAD_REQUEST})
    
@api_view(['GET'])
def view_details(request):
     
     
    # checking for the parameters from the URL
    if request.query_params:
        adoption = Adopt.objects.filter(**request.query_params.dict())
    else:
        adoption = Adopt.objects.all()
 
    # if there is something in adoption else raise error
    if adoption:
        serializer = AdoptSerializer(adoption, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "No data found", "status":status.HTTP_404_NOT_FOUND})
    

@api_view(['POST'])
def update_details(request, pk):
    print("Received primary key:", pk)  # Print the received primary key for debugging

    try:
        adoption = Adopt.objects.get(pk=pk)
    except Adopt.DoesNotExist:
        return Response({"error": "Adoption matching query does not exist."}, status=status.HTTP_404_NOT_FOUND)

    serializer = AdoptSerializer(instance=adoption, data=request.data)
 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_details(request, pk):
    adoption = get_object_or_404(Adopt, pk=pk)
    adoption.delete()
    return Response(status=status.HTTP_202_ACCEPTED)