from django.db import models

# Create your models here.
class Attendance(models.Model):
    schedule = models.ForeignKey('schedule.Schedule', verbose_name='Занятие', on_delete=models.CASCADE, related_name='attendances')
    student = models.ForeignKey('users.Student', verbose_name='Студент', on_delete=models.CASCADE, related_name='attendances')
    is_present = models.BooleanField(default=False)
