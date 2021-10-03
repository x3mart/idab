from django.db import models

# Create your models here.
class Slack(models.Model):
    link = models.URLField(verbose_name='Ссылка', max_length=200)