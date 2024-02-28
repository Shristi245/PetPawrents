import random
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
# from user.utils import send_otp_phone
from user.manager import UserManager



CATEGORY_CHOICES = (    
    ('dogs', 'Dogs'),
    ('cats', 'Cats'),
    ('birds', 'Birds'),

)


# Creating product form

class ProductsModel(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to = "images/")
    price = models.DecimalField(max_digits=10, decimal_places=2)
  

    def __str__(self):
        return self.title
    

phone_regex = RegexValidator(
    regex = r"^\d{10}", message = "Phone number must be 10 digits long."
)

class AppUser(AbstractUser):
    first_name = models.CharField(max_length=100, null=False, blank=False,)
    last_name = models.CharField(max_length=100, null=False, blank=False,)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(unique=True, max_length=100, null=False, blank=False, validators=[phone_regex])
    email_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects= UserManager()

    def __str__(self):
        return self.username
    
    # def generate_and_send_otp(self):
    #     self.otp = str(random.randint(1000, 9999))  # Generate OTP
    #     self.save()  # Save the generated OTP to the user instance
    #     send_otp_phone(self.phone_number, self.otp)  # Send OTP to the user's phone number
    

class Pet(models.Model):
    petname = models.CharField(max_length=100)
    pettype = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    owner = models.ForeignKey(AppUser, related_name='pets', on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class Profile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)

    def __str__ (self):
        return self.full_name


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=AppUser)
post_save.connect(save_user_profile, sender=AppUser)
    



