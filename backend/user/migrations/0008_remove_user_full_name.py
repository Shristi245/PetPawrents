# Generated by Django 5.0 on 2024-04-05 05:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_user_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='full_name',
        ),
    ]
