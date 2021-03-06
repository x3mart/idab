# Generated by Django 3.1.6 on 2022-03-10 11:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0020_traininggroup_slack_id'),
        ('users', '0034_auto_20211111_1228'),
        ('tasks', '0005_auto_20211006_1402'),
    ]

    operations = [
        migrations.AddField(
            model_name='solution',
            name='unreaded',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='task',
            name='teacher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='users.teacher', verbose_name='Преподаватель'),
        ),
        migrations.AlterField(
            model_name='task',
            name='training_group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='programs.traininggroup', verbose_name='Группа'),
        ),
    ]
