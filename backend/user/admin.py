from django.contrib import admin
from user.models import User, Pet

class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "first_name", "last_name", "mobile", "username"]


class PetAdmin(admin.ModelAdmin):
    list_display = ['id', 'pettype', 'petname', 'age', 'height', 'weight']

admin.site.register(User, UserAdmin)
admin.site.register(Pet, PetAdmin)
