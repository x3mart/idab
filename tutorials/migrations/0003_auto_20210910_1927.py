# Generated by Django 3.1.6 on 2021-09-10 16:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutorials', '0002_auto_20210910_1839'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tutorial',
            old_name='groups',
            new_name='training_groups',
        ),
    ]