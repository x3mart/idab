# Generated by Django 3.1.6 on 2021-10-13 14:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0020_traininggroup_slack_id'),
        ('checkpoints', '0005_auto_20211013_1725'),
        ('schedule', '0010_schedule_visited_students'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='checkpoint',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='schedule', to='checkpoints.checkpoint', verbose_name='Контрольная точка'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='training_group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='schedule', to='programs.traininggroup', verbose_name='Группа'),
        ),
    ]