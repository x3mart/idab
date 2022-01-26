from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from programs.models import TrainingGroup
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os


def user_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    return 'avatars/{0}/{1}{2}'.format(slugify(unidecode(instance.name)), slugify(unidecode(name)), extension)


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Укажите Ваш e-mail')
        
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            is_staff=False
            )
        user.set_password(password)
        user.save()
        return user


    def create_superuser(self, email, name, password):
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            is_staff = True,
            is_superuser = True,
            is_active = True
            )
        user.set_password(password)
        user.save()

        return user
    

    # def create_teacher(self, email, name, password):
    #     teacher = Teacher.objects.model(
    #         email=email,
    #         name=name,
    #         )
    #     teacher.set_password(password)
    #     teacher.save()

    #     return teacher


    # def create_student(self, email, name, password, traning_group):
    #     traning_group = TrainingGroup.objects.get(pk=traning_group)
    #     student = Student.objects.model(
    #         email=email,
    #         name=name,
    #         traning_group = traning_group
    #         )
    #     print('WOW')
    #     student.set_password(password)
    #     student.save()

    #     return student


class User(AbstractBaseUser, PermissionsMixin):
    class Sex(models.TextChoices):
        MALE = 'male', _('Мужчина')
        FEMALE = 'female', _('Женщина')

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, verbose_name='Полное имя')
    avatar = models.ImageField(upload_to=user_directory_path, null=True, blank=True,)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False, verbose_name='Сотрудник')
    is_student = models.BooleanField(default=False, verbose_name='Студент')
    is_teacher = models.BooleanField(default=False, verbose_name='Преподаватель')
    birthday = models.DateField(null=True, blank=True, verbose_name='День рождения')
    sex = models.CharField(
        max_length=6,
        choices=Sex.choices,
        null=True,
        blank=True,
        verbose_name='Пол'
    )
    phone = PhoneNumberField(null=True, blank=True, verbose_name='Телефон')
    adress = models.CharField(max_length=255, null=True, blank=True, default='Россия', verbose_name='Адрес')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['name',]

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['id']
    

    def __str__(self):
        return self.name


class Teacher(User):
    short_position = models.CharField(max_length=255, null=True, blank=True, verbose_name='Краткое название должности')
    full_position = models.CharField(max_length=255, null=True, blank=True, verbose_name='Полное название должности')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    link = models.URLField(default='idab.mba' ,null=True, blank=True, verbose_name='Ссылка')
    on_site = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'


class Student(User):
    company = models.CharField(max_length=255, null=True, blank=True, verbose_name='Компания')
    position = models.CharField(max_length=255, null=True, blank=True, verbose_name='Должность')
    training_group = models.ManyToManyField('programs.TrainingGroup', blank=True, related_name='students', verbose_name='Группа')

    def __str__(self):
        return self.name
    

    class Meta:
        ordering = ['-id']
        verbose_name = 'Слушатель'
        verbose_name_plural = 'Слушатели'


class Manager(models.Model):
    user = models.OneToOneField('User', on_delete=models.PROTECT, verbose_name='Пользователь')
    short_position = models.CharField(max_length=255, null=True, blank=True, verbose_name='Краткое название должности')
    full_position = models.CharField(max_length=255, null=True, blank=True, verbose_name='Полное название должности')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    email2 = models.EmailField(max_length=255)
    is_leader = models.BooleanField(default=False)

    @property
    def get_name(self):
        return self.user.name
    
    @property
    def get_avatar(self):
        return self.user.avatar.url

    def __str__(self):
        return self.user.name

    class Meta:
        verbose_name = 'Руководитель'
        verbose_name_plural = 'Руководство'