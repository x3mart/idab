# Generated by Django 3.1.6 on 2021-02-18 17:34

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0009_auto_20210218_1614'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(blank=True, max_length=150, null=True, verbose_name='Полное имя')),
                ('answer', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='Текст')),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Отзыв',
                'verbose_name_plural': 'Отзывы',
                'ordering': ['id'],
            },
        ),
    ]
