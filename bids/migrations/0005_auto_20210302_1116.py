# Generated by Django 3.1.6 on 2021-03-02 11:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0011_event'),
        ('bids', '0004_auto_20210224_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventbid',
            name='event',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.PROTECT, to='news.event', verbose_name='Событие'),
        ),
    ]
