# Generated by Django 3.1.6 on 2021-02-24 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bids', '0002_auto_20210224_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educationbid',
            name='email',
            field=models.EmailField(max_length=255),
        ),
        migrations.AlterField(
            model_name='eventbid',
            name='email',
            field=models.EmailField(max_length=255),
        ),
        migrations.AlterField(
            model_name='planbid',
            name='email',
            field=models.EmailField(max_length=255),
        ),
        migrations.AlterField(
            model_name='programbid',
            name='email',
            field=models.EmailField(max_length=255),
        ),
    ]
