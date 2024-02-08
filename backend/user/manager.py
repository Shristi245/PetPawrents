from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self, phone_number, password, **extra_fields):

        """
        Creates and saves a User with the given phonenumber and password.
        """
        if not phone_number:
            raise ValueError('The given phone number must be set')
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # def create_user(self, phone_number, password=None, **extra_fields):
    #     if not phone_number:
    #         raise ValueError('The phone number must be set')
    #     user = self.model(phone_number=phone_number, **extra_fields)
    #     user.set_password(password)
    #     user.save()
    #     return user


    def create_superuser(self, phone_number, password):
       user = self.create_user(phone_number, password)
       user.is_active = True
       user.is_staff = True
       user.is_superuser = True
       user.save(using=self._db)
       return user
