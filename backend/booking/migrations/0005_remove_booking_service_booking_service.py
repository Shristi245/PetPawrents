# Generated by Django 5.0 on 2024-04-15 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0004_service'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='service',
        ),
        migrations.AddField(
            model_name='booking',
            name='service',
            field=models.ManyToManyField(to='booking.service'),
        ),
    ]
