# Generated by Django 3.1.6 on 2021-10-03 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_auto_20211003_1915'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='mark',
        ),
        migrations.AddField(
            model_name='solution',
            name='mark',
            field=models.PositiveIntegerField(null=True, verbose_name='Отметка'),
        ),
    ]
