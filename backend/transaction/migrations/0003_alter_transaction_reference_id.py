# Generated by Django 5.0 on 2024-05-02 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0002_alter_transaction_reference_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='reference_id',
            field=models.IntegerField(default=0),
        ),
    ]
