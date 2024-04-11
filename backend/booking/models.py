from django.db import models

# Create your models here.
from django.db import models
from user.models import User
from django.utils import timezone

# Create your models here.
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pet_type = models.CharField(max_length=50)
    service = models.CharField(max_length=100)
    time = models.TimeField(default=timezone.now)
    date = models.DateField()
    status = models.CharField(default="pending") 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_aggressive = models.CharField(default='Unknown')
    breed = models.CharField(max_length=100, blank=True, null=True)


    