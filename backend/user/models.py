from django.contrib.auth.models import AbstractUser
from django.db.models import BooleanField, CharField, EmailField
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser):

    USER_TYPE = (("ADMIN", "ADMIN"), ("CUSTOMER", "CUSTOMER"))

    username = CharField(_("Name of User"), blank=True, max_length=255)
    email = EmailField(_("Email Address"), unique=True)
    email_verified = BooleanField(default=False)
    user_type = CharField(max_length=8, choices=USER_TYPE, default="HOTEL")
    mobile = CharField(_("Mobile Number"), blank=True, max_length=255)
    first_name = CharField(_("First Name"), max_length=150, blank=True)
    last_name = CharField(_("Last Name"), max_length=150, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = CustomUserManager()

    def __str__(self):
        return self.username or self.email or self.mobile or ""
