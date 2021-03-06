# Generated by Django 3.1.6 on 2021-02-25 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0013_auto_20210225_0833'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['number'], 'verbose_name': 'Категория программ', 'verbose_name_plural': 'Категории программ'},
        ),
        migrations.AlterModelOptions(
            name='program',
            options={'ordering': ['number'], 'verbose_name': 'Программа', 'verbose_name_plural': 'Программы'},
        ),
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(max_length=255),
        ),
    ]
