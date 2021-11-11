from django.db import models

# Create your models here.
class Rating(models.Model):
    student = models.OneToOneField('users.Student', on_delete=models.CASCADE, related_name='rating', verbose_name='Студент')
    schedule_count = models.IntegerField(default=0)
    attendances_count = models.IntegerField(default=0)
    attendances_rating_prc = models.IntegerField(default=0)
    attendances_rating = models.IntegerField(default=0)
    checkpoints_count = models.IntegerField(default=0)
    completed_checkpoints = models.IntegerField(default=0)
    completed_checkpoints_marks_avg = models.IntegerField(default=0)
    checkpoints_rating = models.IntegerField(default=0)
    tasks_count = models.IntegerField(default=0)
    solutions_count = models.IntegerField(default=0)
    solutions_mark_avg = models.IntegerField(default=0)
    tasks_rating = models.IntegerField(default=0)

    class Meta:
        verbose_name='Рейтинг'
        verbose_name_plural='Рейтинги'
    
    def __str__(self):
        return self.student.name