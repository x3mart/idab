from django.db import models

# Create your models here.
class CheckpointsName(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Наименование контрольной точки'
        verbose_name_plural = 'Наименования контрольных точек'


class Checkpoint(models.Model):
    base = models.ForeignKey('CheckpointsName', on_delete=models.PROTECT, verbose_name='Название')
    course = models.ForeignKey('courses.Course', on_delete=models.PROTECT, verbose_name='Курс')
    description = models.TextField(verbose_name='Описание', null=True, blank=True)
    number = models.PositiveIntegerField(default=1, verbose_name='Номер подобной КТ для данного Курса')
    in_table = models.BooleanField(default=False, verbose_name='Уже в расписании')

    def __str__(self):
        return self.base.name + ' №' + str(self.number)

    class Meta:
        verbose_name = 'Контрольная точка'
        verbose_name_plural = 'Контрольные точки'
        unique_together = ['course', 'base', 'number']


class Grade(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Условия оценки')
    value = models.PositiveIntegerField(verbose_name='Баллы')

    def __str__(self):
        return self.name + ' - ' + str(self.value)

    class Meta:
        verbose_name = 'Оценка'
        verbose_name_plural = 'Оценки'


class StudentCheckpoint(models.Model):
    student = models.ForeignKey('users.Student', on_delete=models.PROTECT, verbose_name='Студент')
    checkpoint = models.ForeignKey('Checkpoint', on_delete=models.PROTECT, verbose_name='Контрольная точка')
    is_passed = models.BooleanField(default=False)
    grade = models.ForeignKey('Grade', on_delete=models.PROTECT, verbose_name='Оценка')
    teacher = models.ForeignKey('users.Teacher', on_delete=models.PROTECT, verbose_name='Преподаватель')

    def __str__(self):
        return str(self.student) + '-' + str(self.checkpoint)

    class Meta:
        verbose_name = 'КТ студента'
        verbose_name_plural = 'КТ студентов'


class Homework(models.Model):
    pass