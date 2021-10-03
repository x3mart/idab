from django.db import models

# Create your models here.
class Library(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', null=True, blank=True)
    link = models.URLField(verbose_name='Ссылка')

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'
    
    def __str__(self):
        return self.name