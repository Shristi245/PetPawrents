from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Adopt
from .serializers import AdoptSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import AdoptedPet
from .serializers import AdoptedPetSerializer

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
def update_details(request, id):
    print("Received primary key:", id)  # Print the received primary key for debugging

    try:
        adoption = Adopt.objects.get(id=id)
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

@api_view(['GET'])
def get_adoption_by_id(request, pk):
    item = get_object_or_404(Adopt, pk=pk)

    if item:
        serializer = AdoptSerializer(item)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_adoption_by_user_id(request, userID):
    try:
        adoptions = AdoptedPet.objects.filter(user_id=userID)
        serializer = AdoptedPetSerializer(adoptions, many=True)
        return Response(serializer.data)
    except AdoptedPet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



class AdoptedPetListAPIView(generics.ListAPIView):
    queryset = AdoptedPet.objects.all()
    serializer_class = AdoptedPetSerializer
    permission_classes = [IsAdminUser]  # Only admin can view all adopted pets

class UserAdoptedPetsAPIView(generics.ListCreateAPIView):
    serializer_class = AdoptedPetSerializer

    def get_queryset(self):
        user = self.request.user
        return AdoptedPet.objects.filter(user=user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        adopt_instance = Adopt.objects.get(id=request.data.get("adopt"))

        if serializer.is_valid():
            adopt_instance.is_adopted = True
            adopt_instance.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    