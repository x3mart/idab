# Generated by Django 3.1.6 on 2021-02-18 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0008_auto_20210218_1610'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='review',
            options={'ordering': ['id'], 'verbose_name': 'Отзыв', 'verbose_name_plural': 'Отзывы'},
        ),
    ]
