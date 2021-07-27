from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class BidBase(models.Model):
    email = models.EmailField(max_length=255)
    name = models.CharField(max_length=255, verbose_name='Полное имя')
    phone = PhoneNumberField(verbose_name='Телефон')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Отправленно')
    
    def __str__(self):
        return self.name

    class Meta:
        abstract = True
        ordering = ['-created_at',]


class EventBid(BidBase):
    event = models.ForeignKey('news.Event', on_delete=models.PROTECT, verbose_name='Событие', blank=True, null=True, default=1)

    class Meta:
        verbose_name = 'Запрос на участие'
        verbose_name_plural = 'Запросы на участие'


class ProgramBid(BidBase):
    company = models.CharField(max_length=255, verbose_name='Компания')
    position = models.CharField(max_length=255, verbose_name='Должность')
    work_experience = models.PositiveIntegerField(verbose_name='Стаж')
    education = models.CharField(max_length=255, verbose_name='Образование')
    program = models.ForeignKey('programs.Program', on_delete=models.PROTECT, verbose_name='Программа')

    class Meta:
        verbose_name = 'Запись на программу'
        verbose_name_plural = 'Записи на программу'


class PlanBid(BidBase):
    program = models.ForeignKey('programs.Program', on_delete=models.PROTECT, verbose_name='Программа')

    class Meta:
        verbose_name = 'Скачать план'
        verbose_name_plural = 'Скачать планы'


class EducationBid(BidBase):
    info = models.TextField(blank=True, null=True, verbose_name='Доп иформация')

    class Meta:
        verbose_name = 'Запись на обучение'
        verbose_name_plural = 'Записи на обучение'