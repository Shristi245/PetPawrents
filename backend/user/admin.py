from django.contrib import admin
from user.models import User, Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "mobile", "username"]

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name' , 'bio', 'image','verified']

admin.site.register(User, UserAdmin)
admin.site.register( Profile,ProfileAdmin)
