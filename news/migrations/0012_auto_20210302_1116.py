# Generated by Django 3.1.6 on 2021-03-02 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bids', '0005_auto_20210302_1116'),
        ('news', '0011_event'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Announcement',
        ),
        migrations.DeleteModel(
            name='News',
        ),
    ]
