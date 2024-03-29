from rest_framework import generics, status
from rest_framework.response import Response
from user.models import User
from appointment.models import Appointment
from products.models import Product
from adoption.models import Adopt
from rest_framework.views import APIView
from user.serializers import UserSerializer
# from appointment.serializers import AppointmentSerializer
from rest_framework.exceptions import NotFound  # Correct import for NotFound exception

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Create your views here.

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NotFound:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class TotalUsersView(APIView):
    def get(self, request):
        totalUsers = User.objects.count()
        return Response({'totalUsers': totalUsers})
    

    

class TotalAppointmentsView(APIView):
    def get(self, request):
        totalAppointments = Appointment.objects.count()
        return Response({'totalAppointments': totalAppointments})

class TotalProductsView(APIView):
    def get(self, request):
        totalProducts = Product.objects.count()
        return Response({'totalProducts': totalProducts})
    
class TotalPetsforAdoptionsView(APIView):
    def get(self, request):
        totalAdoptionDetails = Adopt.objects.count()
        return Response({'totalAdoptionDetails': totalAdoptionDetails})