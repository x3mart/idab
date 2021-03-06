# Generated by Django 3.1.6 on 2021-11-11 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0020_traininggroup_slack_id'),
        ('courses', '0009_auto_20210616_1733'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name': 'Дисциплина', 'verbose_name_plural': 'Дисциплины'},
        ),
        migrations.AlterField(
            model_name='coursesblock',
            name='programs',
            field=models.ManyToManyField(blank=True, related_name='courses_blocks', to='programs.Program', verbose_name='Программы'),
        ),
    ]
