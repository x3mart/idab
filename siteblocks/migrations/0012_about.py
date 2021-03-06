# Generated by Django 3.1.6 on 2021-02-24 14:32

import ckeditor_uploader.fields
from django.db import migrations, models
import siteblocks.models


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0011_auto_20210218_1735'),
    ]

    operations = [
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=150, null=True, verbose_name='Полное имя')),
                ('body', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='Текст')),
                ('image', models.ImageField(blank=True, max_length=255, null=True, upload_to=siteblocks.models.about_directory_path, verbose_name='Иллюстрация')),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'О нас',
                'verbose_name_plural': 'О нас',
                'ordering': ['id'],
            },
        ),
    ]
