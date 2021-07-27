# Generated by Django 3.1.6 on 2021-02-19 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_auto_20210219_1609'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='company',
        ),
        migrations.RemoveField(
            model_name='user',
            name='position',
        ),
        migrations.AddField(
            model_name='student',
            name='company',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Компания'),
        ),
        migrations.AddField(
            model_name='student',
            name='position',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Должность'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='full_manager_position',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Полное название должности руководителя'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='manager_description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание как руководителя'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='short_manager_position',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Краткое название должности руководителя'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='short_teacher_position',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Краткое название должности преподавателя'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='teacher_description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание как учителя'),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='full_teacher_position',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Полное название должности преподавателя'),
        ),
    ]
