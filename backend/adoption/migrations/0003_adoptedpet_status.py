# Generated by Django 5.0 on 2024-04-05 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adoption', '0002_adopt_is_adopted_adoptedpet'),
    ]

    operations = [
        migrations.AddField(
            model_name='adoptedpet',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]