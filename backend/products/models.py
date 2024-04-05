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
    

class Cart(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image= models.ImageField(upload_to = "cart/")
    item_id=models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title