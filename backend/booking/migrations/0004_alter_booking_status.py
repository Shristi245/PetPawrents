# Generated by Django 5.0 on 2024-03-31 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0003_booking_created_at_booking_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='status',
            field=models.CharField(default='pending'),
        ),
    ]
