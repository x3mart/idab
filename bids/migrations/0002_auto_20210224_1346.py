# Generated by Django 3.1.6 on 2021-02-24 13:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0009_auto_20210218_1804'),
        ('bids', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventbid',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='news.announcement', verbose_name='Событие'),
        ),
    ]
