# Generated by Django 3.1.6 on 2021-02-20 14:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_remove_teacher_decription'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['id'], 'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
    ]
