from django.db import models
from user.models import User
# Create your models here.
class Adopt(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.TextField()
    updated_date = models.DateTimeField(auto_now=True)
    is_adopted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Agreement(models.Model):
    adopt = models.ForeignKey(Adopt, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    adopter_name = models.CharField(max_length=100)
    contact_information = models.CharField(max_length=100)
    permanent_address = models.CharField(max_length=100)
    temporary_address = models.CharField(max_length=100)
    agreement_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.adopt
    
    
class AdoptedPet(models.Model):
    adopt = models.ForeignKey(Adopt, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    adopted_date = models.DateTimeField(auto_now=True)
    status = models.CharField(default="pending")
    aggreement = models.ForeignKey(Agreement, on_delete=models.CASCADE, default=None)
    def __str__(self):
        return self.adopt 
    


