# Generated by Django 3.1.6 on 2021-09-22 20:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0009_auto_20210616_1733'),
        ('schedule', '0005_auto_20210922_2233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='courses.course', verbose_name='Название урока'),
        ),
    ]
