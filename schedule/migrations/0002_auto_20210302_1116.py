# Generated by Django 3.1.6 on 2021-03-02 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='schedule',
            options={'verbose_name': 'Занятие', 'verbose_name_plural': 'Рассписание'},
        ),
    ]
