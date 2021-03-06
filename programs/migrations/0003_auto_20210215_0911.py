# Generated by Django 3.1.6 on 2021-02-15 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0002_auto_20210210_1314'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Программа')),
                ('short_description', models.CharField(blank=True, max_length=255, null=True, verbose_name='Краткое описание')),
                ('full_description', models.TextField(verbose_name='Полное описание')),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.AddField(
            model_name='program',
            name='full_description',
            field=models.TextField(default=1, verbose_name='Полное описание'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='program',
            name='short_description',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Краткое описание'),
        ),
        migrations.AddField(
            model_name='program',
            name='start_autumn',
            field=models.DateField(blank=True, null=True, verbose_name='Осенний набор'),
        ),
        migrations.AddField(
            model_name='program',
            name='start_spring',
            field=models.DateField(blank=True, null=True, verbose_name='Осенний набор'),
        ),
        migrations.AddField(
            model_name='program',
            name='training_plan',
            field=models.FileField(default=1, upload_to='', verbose_name='Учебный план файл'),
            preserve_default=False,
        ),
    ]
