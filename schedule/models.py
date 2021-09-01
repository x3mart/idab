from django.db import models

# Create your models here.
class Schedule(models.Model):
    room = models.CharField(max_length=50, verbose_name='Аудитория')
    training_day = models.DateField(verbose_name='Дата занятий')
    start_time = models.TimeField(verbose_name='Начало занятий')
    end_time = models.TimeField(verbose_name='Окончание занятий')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, verbose_name='Курс')
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, verbose_name='Преподаватель', null=True, blank=True)
    guest_star = models.CharField(max_length=150, verbose_name='Преподаватель на замену', null=True, blank=True)
    training_group = models.ForeignKey('programs.TrainingGroup', on_delete=models.CASCADE, verbose_name='Группа')
    checkpoint = models.ForeignKey('checkpoints.Checkpoint', on_delete=models.CASCADE, verbose_name='Контрольная точка', null=True, blank=True)

    def __str__(self):
        return str(self.training_day) + ' - ' + self.training_group.basic.name

    class Meta:
        verbose_name = 'Занятие'
        verbose_name_plural = 'Рассписание'
    pass