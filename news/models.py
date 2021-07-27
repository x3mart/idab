from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from django.template.defaultfilters import truncatechars
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os
from utils.image_crop import create_crop_3x1_wout_tmb, create_tmb, get_tmb_path
# from django.contrib.sites.models import Site


def image_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = slugify(unidecode(instance.title))
    if len(folder) > 75:
        folder = folder[:75]
    return 'uploads/news/{0}/{1}{2}'.format(folder, slugify(unidecode(name)), '.jpg')


class Event(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    description = models.CharField(max_length=255, verbose_name='Описание')
    startdate = models.DateField(verbose_name='Дата начала события')
    enddate = models.DateField(verbose_name='Дата окончания события', null=True, blank=True)
    starttime = models.TimeField(verbose_name='Время начала события')
    endtime = models.TimeField(verbose_name='Время окончания события', null=True, blank=True)
    body = RichTextUploadingField(verbose_name='Текст')
    image = models.ImageField(max_length=255, verbose_name='Иллюстрация', upload_to=image_directory_path)
    view = models.PositiveIntegerField(default=0)
    is_online = models.BooleanField(default=False)
    class Meta:
        verbose_name = 'События'
        verbose_name_plural = 'События'
        ordering = ['startdate']
    
    def __str__(self):
        return truncatechars(self.title, 20)   

    def save(self, *args, **kwargs):
        super(Event, self).save()
        if not os.path.isfile(get_tmb_path(self)):
            create_tmb(self)
            create_crop_3x1_wout_tmb(self)
    
    @property
    def get_tmb_url(self):
        return get_tmb_path(self)
    
    @property
    def get_event_date(self):
        if not self.enddate is None and self.enddate !=self.startdate:
            eventdate = self.startdate.strftime('%d.%m.%Y') + ' - ' + self.enddate.strftime('%d.%m.%Y')
        else:
            eventdate = self.startdate.strftime('%d.%m.%Y')
        
        return eventdate
    
    @property
    def get_event_time(self):
        if not self.endtime is None and self.endtime !=self.starttime:
            eventtime = self.starttime.strftime('%H:%M') + ' - ' + self.endtime.strftime('%H:%M')
        else:
            eventtime = self.starttime.strftime('%H:%M')
        
        return eventtime

# class News(NewsBase):
#     publication_date = models.DateField(auto_now_add=True, verbose_name='Дата публикации')
#     is_active = models.BooleanField(default=True)

#     class Meta:
#         verbose_name = 'Новость'
#         verbose_name_plural = 'Новости'
#         ordering = ['-publication_date']


# class Announcement(NewsBase):
#     start = models.DateTimeField(verbose_name='Начало события')
#     end = models.DateTimeField(verbose_name='Окончание события')

#     class Meta:
#         verbose_name = 'Анонс'
#         verbose_name_plural = 'Анонсы'
#         ordering = ['-start']