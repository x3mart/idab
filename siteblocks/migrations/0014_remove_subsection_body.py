# Generated by Django 3.1.6 on 2021-03-17 10:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0013_auto_20210317_1324'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subsection',
            name='body',
        ),
    ]
