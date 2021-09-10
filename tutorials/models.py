from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os

def tutorial_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    return 'tutorials/{0}.{1}'.format(slugify(unidecode(name)), extension)


# Create your models here.
class Library(models.Model):
    pass


class Tutorial(models.Model):
    title = models.CharField(max_length=255, verbose_name="Наименование", null=True, blank=True)
    file = models.FileField(max_length=255, verbose_name="Файл", null=True, upload_to=tutorial_directory_path)
    training_groups = models.ManyToManyField("programs.TrainingGroupBasic", verbose_name="Группа", related_name="tutorials")
    courses = models.ManyToManyField("courses.Course", verbose_name="Предметы", related_name="tutorials")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Методический материал'
        verbose_name_plural = 'Методические материалы'