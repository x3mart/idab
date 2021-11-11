from django.db import models

# Create your models here.
class Schedule(models.Model):
    room = models.CharField(max_length=50, verbose_name='Аудитория')
    start_date = models.DateTimeField(verbose_name='Начало занятий', null=True, blank=True)
    end_date = models.DateTimeField(verbose_name='Окончание занятий', null=True, blank=True)
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, verbose_name='Название урока', null=True, blank=True)
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, verbose_name='Преподаватель', null=True, blank=True)
    guest_star = models.CharField(max_length=150, verbose_name='Преподаватель на замену', null=True, blank=True)
    training_group = models.ForeignKey('programs.TrainingGroup', on_delete=models.CASCADE, verbose_name='Группа', null=True, blank=True, related_name='schedule')
    checkpoint = models.ForeignKey('checkpoints.Checkpoint', on_delete=models.CASCADE, verbose_name='Контрольная точка', null=True, blank=True, related_name='schedule')
    visited_students = models.ManyToManyField("users.Student", verbose_name="Посетившие студенты", through='attendances.Attendance', blank=True)

    def __str__(self):
        return str(self.start_date) + ' - ' + self.training_group.basic.name

    class Meta:
        verbose_name = 'Занятие'
        verbose_name_plural = 'Рассписание'

    