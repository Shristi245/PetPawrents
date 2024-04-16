from django.db import models
from user.models import User
# Create your models here.
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=100)
    reference_id = models.IntegerField()
    amount = models.FloatField()
    transaction_date = models.DateTimeField(auto_now=True)