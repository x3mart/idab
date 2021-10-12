from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os


def get_study_material_file_path(instance, filename):
    name, extension = os.path.splitext(filename)
    return 'solutions/{0}/{1}{2}'.format(slugify(unidecode(instance.name)), slugify(unidecode(name)), extension)

class StudyMaterial(models.Model):
    training_groups = models.ManyToManyField('programs.TrainingGroup', related_name='study_materials', verbose_name='Учебная группа')
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', null=True, blank=True)
    file = models.FileField(max_length=255, verbose_name='Вложение', upload_to=get_study_material_file_path)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Учебный материал'
        verbose_name_plural = 'Учебные материалы'
    
    def __str__(self):
        return self.name