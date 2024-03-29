from django.db import models

# Create your models here.
class Adopt(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.TextField()
    updated_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name