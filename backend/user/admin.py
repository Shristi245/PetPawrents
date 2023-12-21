from django.contrib import admin
from user.models import AppUser,Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name' ,'verified']

admin.site.register(AppUser, UserAdmin)
admin.site.register( Profile,ProfileAdmin)