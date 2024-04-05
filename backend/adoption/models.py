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
    

class AdoptedPet(models.Model):
    adopt = models.ForeignKey(Adopt, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    adopted_date = models.DateTimeField(auto_now_add=True)
    status= models.CharField(default="pending")
    
    def __str__(self):
        return self.adopt