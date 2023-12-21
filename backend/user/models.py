from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser





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
    



class AppUser (AbstractUser):
	username = models. CharField (max_length=100)
	email = models. EmailField (unique=True)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS= ['username']
    

	def __str__(self):
         return self.username


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

    


    



