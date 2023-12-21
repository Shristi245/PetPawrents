from django.db import models

# Create your models here.
class ProductsModel(models.Model):

    CATEGORY_CHOICES = (
    ('dogs', 'Dogs'),
    ('cats', 'Cats'),
    ('birds', 'Birds'),

)
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
  

    def __str__(self):
        return self.title
    

class ImageModel(models.Model):
    product = models.ForeignKey(ProductsModel, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()

    def __str__(self):
        return f"Image for {self.product.title}"