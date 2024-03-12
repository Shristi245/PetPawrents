from django.contrib import admin

# Register your models here.

# Register your models here.
from django.contrib import admin
from products.models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'price']

admin.site.register(Product, ProductAdmin)
