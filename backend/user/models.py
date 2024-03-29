from django.contrib.auth.models import AbstractUser
from django.db.models import BooleanField, CharField, EmailField
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.db import models
from django.db.models.signals import post_save



# Create your models here.
class User(AbstractUser):

    USER_TYPE = (("ADMIN", "ADMIN"), ("CUSTOMER", "CUSTOMER"))

    username = CharField(_("Name of User"), blank=True, max_length=255)
    email = EmailField(_("Email Address"), unique=True)
    email_verified = BooleanField(default=False)
    user_type = CharField(max_length=8, choices=USER_TYPE, default="CUSTOMER")
    mobile = CharField(_("Mobile Number"), blank=True, max_length=255)
    first_name = CharField(_("First Name"), max_length=150, blank=True)
    last_name = CharField(_("Last Name"), max_length=150, blank=True)
    full_name = models.CharField(max_length=1000, null=False, blank=True)
    bio = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to="user_images", default="default.jpg")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = CustomUserManager()

    def __str__(self):
        return self.username



class Pet(models.Model):
    petname = models.CharField(max_length=100)
    pettype = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    owner = models.ForeignKey(User, related_name='pets', on_delete=models.CASCADE)

    def __str__(self):
        return self.petname
    



# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

# post_save.connect(create_user_profile, sender=User)
# post_save.connect(save_user_profile, sender=User)