# Generated by Django 3.1.6 on 2021-08-18 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0018_auto_20210816_1810'),
        ('users', '0032_auto_20210818_1131'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='training_group',
        ),
        migrations.AddField(
            model_name='student',
            name='training_group',
            field=models.ManyToManyField(null=True, related_name='students', to='programs.TrainingGroup'),
        ),
    ]
