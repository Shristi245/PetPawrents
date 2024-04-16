from django.db import models
from user.models import User

#category choice 

CATEGORY_CHOICES = (
    ('toys', 'Toys'),
    ('food', 'Food'),
    ('cosmetics', 'Cosmetics'),
    ('clothes', 'Clothes'),
)


# Creating UserUploadedItem form

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    image = models.TextField()
    price = models.PositiveIntegerField()
    
    def __str__(self):
        return self.title
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount= models.FloatField()
    paid_amount = models.FloatField()
    status = models.CharField(max_length=100, default="Not Delivered")


class Orderitem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)    

    def __str__(self):
        return self.order
