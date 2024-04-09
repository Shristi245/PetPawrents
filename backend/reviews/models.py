from django.db import models
from user.models import User

# Create your models here.
class Reviews(models.Model):
    type = models.CharField(max_length=255)
    content = models.TextField()
    star = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
