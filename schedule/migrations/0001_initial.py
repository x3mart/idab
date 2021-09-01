# Generated by Django 3.1.6 on 2021-02-28 10:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0008_auto_20210220_1428'),
        ('checkpoints', '0004_auto_20210214_1316'),
        ('users', '0024_teacher_on_site'),
        ('programs', '0015_auto_20210225_0908'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room', models.CharField(max_length=50, verbose_name='Аудитория')),
                ('training_day', models.DateField(verbose_name='Дата занятий')),
                ('start_time', models.TimeField(verbose_name='Начало занятий')),
                ('end_time', models.TimeField(verbose_name='Окончание занятий')),
                ('guest_star', models.CharField(blank=True, max_length=150, null=True, verbose_name='Преподаватель на замену')),
                ('checkpoint', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='checkpoints.checkpoint', verbose_name='Контрольная точка')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course', verbose_name='Курс')),
                ('teacher', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.teacher', verbose_name='Преподаватель')),
                ('training_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.traininggroup', verbose_name='Группа')),
            ],
            options={
                'verbose_name': 'Преподаватель',
                'verbose_name_plural': 'Преподаватели',
            },
        ),
    ]
