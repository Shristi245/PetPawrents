# Generated by Django 5.0 on 2024-04-14 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_remove_pet_owner_pet_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.TextField(default='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
        ),
    ]
