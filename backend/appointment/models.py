from django.db import models
from user.models import User
from django.utils import timezone

# Create your models here.
class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=timezone.now)
    pet_type = models.CharField(max_length=50)
    service = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    status = models.BooleanField(default="pending")  


class Service(models.Model):
    name=models.CharField(max_length=100)

   