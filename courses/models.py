from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class CoursesBlock(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    programs = models.ManyToManyField('programs.Program', verbose_name='Программы', blank=True, related_name='courses_blocks')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Блок дисциплин'
        verbose_name_plural = 'Блоки дсциплин'


class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    hours = models.IntegerField(null=True, blank=True, verbose_name='Количество часов')
    blocks = models.ManyToManyField('CoursesBlock', verbose_name='Блоки дсциплин', blank=True, related_name='courses')
    teachers = models.ManyToManyField('users.Teacher', verbose_name='Преподаватели', blank=True, related_name='courses' )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Дисциплина'
        verbose_name_plural = 'Дисциплины'