# Generated by Django 3.1.6 on 2021-04-02 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0016_program_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='meta_description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='meta_title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
