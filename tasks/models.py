from typing import Text
from django.db import models
from django.db.models import fields
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os



def get_tasks_file_path(instance, filename):
    name, extension = os.path.splitext(filename)
    return 'tasks/{0}/{1}{2}'.format(slugify(unidecode(instance.name)), slugify(unidecode(name)), extension)
def get_solution_file_path(instance, filename):
    name, extension = os.path.splitext(filename)
    return 'solutions/{0}/{1}{2}'.format(slugify(unidecode(instance.student.name)), slugify(unidecode(name)), extension)


class Task(models.Model):
    students = models.ManyToManyField('users.Student', related_name='tasks', verbose_name='Студент')
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='tasks', verbose_name='Преподаватель', null=True, blank=True)
    training_group = models.ForeignKey('programs.TrainingGroup', on_delete=models.CASCADE, related_name='tasks', verbose_name='Группа', null=True, blank=True)
    name = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    description = models.TextField(verbose_name='Описание', null=True, blank=True)
    file = models.FileField(max_length=255, upload_to=get_tasks_file_path, verbose_name='Вложение', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        verbose_name = 'Задание'
        verbose_name_plural = 'Задания'
    
    def __str__(self):
        return self.name if self.name else '--'


class Solution(models.Model):
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='solutions', verbose_name='Студент')
    task = models.ForeignKey('Task', on_delete=models.CASCADE, related_name='solutions', verbose_name='Задача')
    description = models.TextField(verbose_name='Описание', null=True, blank=True)
    file = models.FileField(max_length=255, upload_to=get_solution_file_path, verbose_name='Вложение', null=True, blank=True)
    mark = models.PositiveIntegerField(verbose_name='Отметка', null=True, blank=True)
    unreaded = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        verbose_name = 'Решение'
        verbose_name_plural = 'Решения'
    
    def __str__(self):
        return f'{self.student.name} {self.task.name}'
