# Generated by Django 3.1.6 on 2021-10-06 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0019_auto_20210901_1321'),
    ]

    operations = [
        migrations.AddField(
            model_name='traininggroup',
            name='slack_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]