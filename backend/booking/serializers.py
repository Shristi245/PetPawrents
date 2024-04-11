# serializers.py
from django.utils import timezone
from rest_framework import serializers
from .models import Booking
from django.utils.translation import gettext as _
from .models import User;

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'mobile', 'first_name', 'last_name')

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, data):
        appointment_date = data.get('date')

        # Check if appointment date is in the past
        if appointment_date < timezone.now().date():
            raise serializers.ValidationError(_("Appointment date cannot be in the past."))

        # You can add more validation here if needed
        return data

    def create(self, validated_data):
        # Create the booking instance
        booking = Booking.objects.create(**validated_data)

        return booking
    

class GETBookingSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Booking
        fields = "__all__"


