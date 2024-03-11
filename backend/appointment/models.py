from django.db import models

# Create your models here.
class Appointment(models.Model):
    full_name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=False, null=False)
    pet_type = models.CharField(max_length=50)
    service = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)  

    def __str__(self):
        return f"{self.full_name} - {self.pet_type} - {self.date} - {self.time}"
    

class Service(models.Model):
    name=models.CharField(max_length=100)

   