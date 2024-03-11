from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import  Service, Appointment
from user.models import Pet
from .serializers import PetSerializer, ServiceSerializer, AppointmentSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
from django.utils.translation import gettext as _

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                date = serializer.validated_data['date']
                time = serializer.validated_data['time']
                
                # Check for appointment availability
                if Appointment.objects.filter(date=date, time=time).exists():
                    return Response({"error": "Appointment slot is already booked."},
                                    status=status.HTTP_400_BAD_REQUEST)
                
                serializer.save()
                return Response({"message": _("Your appointment is booked.")},
                                status=status.HTTP_201_CREATED)
            except KeyError as e:
                return Response({"error": f"Missing required field: {e}"},
                                status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            # Check for appointment approval/cancellation by admin
            is_approved = serializer.validated_data.get('is_approved', None)
            if is_approved is not None:
                instance.is_approved = is_approved
                instance.save()
                return Response(serializer.data)
            return Response({"error": "Please provide 'is_approved' field to approve/cancel the appointment."},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)