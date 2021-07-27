from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os
from utils.image_crop import create_crop_3x1_wout_tmb, create_tmb, get_tmb_path

# Create your models here.
def image_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = slugify(unidecode(instance.gallery.name))
    if len(folder) > 75:
        folder = folder[:75]
    return 'gallery/{0}/{1}{2}'.format(folder, slugify(unidecode(name)), '.jpg')


class Gallery(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    class Meta:
        verbose_name = 'Галерея'
        verbose_name_plural = 'Галереи'
        ordering = ['id']
    
    def __str__(self):
        return self.name

class ImageIdab(models.Model):
    image = models.ImageField(max_length=255, verbose_name='Изображение', upload_to=image_directory_path)
    gallery = models.ForeignKey('Gallery', related_name='images', on_delete=models.PROTECT, verbose_name='Галерея')

    def __str__(self):
        return self.image.url

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'
        ordering = ['-id']
    
    def save(self, *args, **kwargs):
        super(ImageIdab, self).save()
        if not os.path.isfile(get_tmb_path(self)):
            create_tmb(self, 400, 400)
            create_crop_3x1_wout_tmb(self, 1200, 800)
    
    @property
    def get_tmb_url(self):
        return get_tmb_path(self)