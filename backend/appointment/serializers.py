# serializers.py
from datetime import datetime
from django.utils import timezone

from rest_framework import serializers
from .models import Service, Appointment
from django.utils.translation import gettext as _




class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

current_datetime = datetime.now()

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"
        read_only_fields = ['is_booked']

    def validate(self, data):
        appointment_date = data.get('date')
        appointment_time = data.get('time')

        # Check if appointment date is in the past
        if appointment_date < timezone.now().date():
            raise serializers.ValidationError(_("Appointment date cannot be in the past."))

        # Check if appointment time is in the past for today's date
        if appointment_date == timezone.now().date() and appointment_time < timezone.now().time():
            raise serializers.ValidationError(_("Appointment time cannot be in the past."))

        # You can add more validation here if needed

        return data

    def create(self, validated_data):
        # Custom logic for creating a new appointment
        appointment = Appointment.objects.create(**validated_data)
        return appointment

    def update(self, instance, validated_data):
        # Custom logic for updating an existing appointment
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.pet_type = validated_data.get('pet_type', instance.pet_type)
        instance.service = validated_data.get('service', instance.service)
        instance.date = validated_data.get('date', instance.date)
        instance.time = validated_data.get('time', instance.time)
        instance.is_booked = validated_data.get('is_booked', instance.is_booked)
        instance.save()
        return instance