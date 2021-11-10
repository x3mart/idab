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
    basic = models.ForeignKey('CheckpointsName', on_delete=models.PROTECT, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', null=True, blank=True)

    def __str__(self):
        return self.basic.name

    class Meta:
        verbose_name = 'Контрольная точка'
        verbose_name_plural = 'Контрольные точки'


class CheckpointMark(models.Model):
    student = models.ForeignKey('users.Student', on_delete=models.PROTECT, verbose_name='Студент', related_name='chekpoint_marks')
    checkpoint = models.ForeignKey('Checkpoint', on_delete=models.PROTECT, verbose_name='Контрольная точка', related_name='chekpoint_marks')
    mark = models.PositiveIntegerField(verbose_name='Баллы')

    def __str__(self):
        return self.student.name + ' - ' + str(self.mark)

    class Meta:
        verbose_name = 'Оценка КТ студента'
        verbose_name_plural = 'Оценки КТ студента'