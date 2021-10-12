from django.db import models
from django.utils.dateformat import format
from ckeditor_uploader.fields import RichTextUploadingField
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os
from utils.image_crop import create_crop_3x1_wout_tmb

# Create your models here.
def plan_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = slugify(unidecode(instance.name))
    if len(folder) > 75:
        folder = folder[:75]
    return 'trainingplans/{0}/{1}{2}'.format(folder, slugify(unidecode(name)), extension)

def image_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = slugify(unidecode(instance.name))
    if len(folder) > 75:
        folder = folder[:75]
    return 'siteblocks/{0}/{1}{2}'.format(folder, slugify(unidecode(name)), extension)


class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='Категория программ')
    short_description = models.CharField(max_length=255, verbose_name='Краткое описание', null=True, blank=True,)
    full_description = RichTextUploadingField(verbose_name='Полное описание',)
    image = models.ImageField(max_length=255, verbose_name='Иллюстрация', upload_to=image_directory_path, null=True, blank=True,)
    number = models.PositiveIntegerField(verbose_name='Порядок сортировки', null=True, blank=True,)
    slug = models.SlugField(max_length=255, null=True, blank=True,)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория программ'
        verbose_name_plural = 'Категории программ'
        ordering = ['number']
    
    def save(self, *args, **kwargs):
        super(Category, self).save()
        if self.image:
            create_crop_3x1_wout_tmb(self)


class Program(models.Model):
    name = models.CharField(max_length=255, verbose_name='Программа')
    slug = models.SlugField(max_length=255, null=True, blank=True,)
    short_description = models.CharField(max_length=255, verbose_name='Краткое описание', null=True, blank=True,)
    full_description = RichTextUploadingField(verbose_name='Полное описание',)
    image = models.ImageField(max_length=255, verbose_name='Иллюстрация', upload_to=image_directory_path, null=True, blank=True,)
    training_plan = models.FileField(verbose_name='Учебный план файл', upload_to=plan_directory_path, null=True, blank=True,)
    start_spring = models.DateField(verbose_name='Весенний набор', null=True, blank=True,)
    start_autumn = models.DateField(verbose_name='Осенний набор', null=True, blank=True,)
    price = models.PositiveIntegerField(verbose_name='Стоимость', null=True, blank=True,)
    number = models.PositiveIntegerField(verbose_name='Порядок сортировки', null=True, blank=True,)
    category = models.ForeignKey('Category', related_name='programs', on_delete=models.PROTECT, null=True, blank=True,)
    meta_title = models.CharField(max_length=255, null=True, blank=True,)
    meta_description = models.CharField(max_length=255, null=True, blank=True,)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Программа'
        verbose_name_plural = 'Программы'
        ordering = ['number']
    
    def save(self, *args, **kwargs):
        super(Program, self).save()
        if self.image:
            create_crop_3x1_wout_tmb(self)


class TrainingGroupBasic(models.Model):
    name = models.CharField(max_length=255, verbose_name='Учебная группа')
    category = models.ForeignKey('Category', on_delete=models.PROTECT, null=True, related_name='training_groups')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Группа(основа)'
        verbose_name_plural = 'Группы(основа)'


class TrainingGroup(models.Model):
    basic = models.ForeignKey('TrainingGroupBasic', on_delete=models.PROTECT, null=True, verbose_name='Название группы')
    start_date = models.DateField(null=True, blank=True, verbose_name='Начало обучения')
    graduation_date = models.DateField(null=True, blank=True, verbose_name='Окончание обучения')
    slack_id = models.CharField(max_length=50, null=True, blank=True)
    # is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.basic.name + ' ' + format(self.start_date, 'Y-m-d')

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'
        ordering = ['-id']
    
    def save(self, *args, **kwargs):
        if not self.pk or not self.slack_id:
            pass
        super(TrainingGroup, self).save(*args, **kwargs)
