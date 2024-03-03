from django.contrib import admin
from user.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "mobile", "username"]

admin.site.register(User, UserAdmin)