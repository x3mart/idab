from django.db import models

# Create your models here.
class Rating(models.Model):
    student = models.OneToOneField('users.Student', on_delete=models.CASCADE, related_name='rating', verbose_name='Студент')
    schedule_count = models.IntegerField(default=0, verbose_name='Прошло занятий')
    attendances_count = models.IntegerField(default=0, verbose_name='Посещенные занятия')
    attendances_rating_prc = models.IntegerField(default=0, verbose_name='Посещаемость в %')
    attendances_rating = models.IntegerField(default=0, verbose_name='Рейтинг посещаемости')
    checkpoints_count = models.IntegerField(default=0, verbose_name='Прошло контрольных точек (КТ)')
    completed_checkpoints = models.IntegerField(default=0, verbose_name='Сдано контрольных точек')
    completed_checkpoints_marks_avg = models.IntegerField(default=0, verbose_name='Средний бал за сданные КТ')
    checkpoints_rating = models.IntegerField(default=0, verbose_name='Рейтинг по КТ')
    tasks_count = models.IntegerField(default=0, verbose_name='Всего заданий')
    solutions_count = models.IntegerField(default=0, verbose_name='Выполненных заданий')
    solutions_mark_avg = models.IntegerField(default=0, verbose_name='Средний бал за выполненные задания')
    tasks_rating = models.IntegerField(default=0, verbose_name='Рейтинг по заданиям')

    class Meta:
        verbose_name='Рейтинг'
        verbose_name_plural='Рейтинги'
    
    def __str__(self):
        return self.student.name
    
    @property
    def total_rating(self):
        return self.tasks_rating + self.attendances_rating + self.checkpoints_rating