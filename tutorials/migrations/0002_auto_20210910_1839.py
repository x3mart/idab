# Generated by Django 3.1.6 on 2021-09-10 15:39

from django.db import migrations, models
import tutorials.models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0009_auto_20210616_1733'),
        ('programs', '0019_auto_20210901_1321'),
        ('tutorials', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tutorial',
            options={'verbose_name': 'Методический материал', 'verbose_name_plural': 'Методические материалы'},
        ),
        migrations.AddField(
            model_name='tutorial',
            name='courses',
            field=models.ManyToManyField(related_name='tutorials', to='courses.Course', verbose_name='Предметы'),
        ),
        migrations.AddField(
            model_name='tutorial',
            name='file',
            field=models.FileField(max_length=255, null=True, upload_to=tutorials.models.tutorial_directory_path, verbose_name='Файл'),
        ),
        migrations.AddField(
            model_name='tutorial',
            name='groups',
            field=models.ManyToManyField(related_name='tutorials', to='programs.TrainingGroupBasic', verbose_name='Группа'),
        ),
        migrations.AddField(
            model_name='tutorial',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Наименование'),
        ),
    ]
