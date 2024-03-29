
# Register your models here.
from django.contrib import admin
from appointment.models import Appointment

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'status', 'service', 'pet_type', 'date', 'time']

admin.site.register(Appointment, AppointmentAdmin)
