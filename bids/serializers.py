from rest_framework import serializers
from .models import EventBid, ProgramBid, PlanBid, EducationBid
from news.models import Event
from programs.models import Program
from phonenumber_field.serializerfields import PhoneNumberField
from django.core.mail import send_mail


def send_to_admin(data, title, reason):
    if reason == 'event':
        subject = 'Получена заявка на участие в мероприятии {}'.format(title)
        message = 'Получена заявка на участие в мероприятии "{}". \n Имя: {}, \n email: {}, \n тел: {}'.format(title, data['name'], data['email'], data['phone'])
        send_mail(subject, message, 'idab.guu@gmail.com',['annadenisova@mail.ru', 'vpetrunenko00@mail.ru', 'viperovm@gmail.com'])
    if reason == 'program':
        subject = 'Получена заявка на обучение по программе {}'.format(title)
        message = 'Получена заявка на обучение по программе "{}". \n Имя: {}, \n email: {}, \n тел: {}, \n место работы: {}, \n должность: {}, \n стаж: {}, \n образование: {}'.format(title, data['name'], data['email'], data['phone'], data['company'], data['position'], data['work_experience'], data['education'])
        send_mail(subject, message, 'idab.guu@gmail.com',['annadenisova@mail.ru', 'vpetrunenko00@mail.ru', 'viperovm@gmail.com'])
    if reason == 'plan':
        subject = 'Отправлен учебный план по программе {}'.format(title)
        message = 'Отправлен учебный план по программе "{}". \n Имя: {}, \n email: {}, \n тел: {}'.format(title, data['name'], data['email'], data['phone'])
        send_mail(subject, message, 'idab.guu@gmail.com',['annadenisova@mail.ru', 'vpetrunenko00@mail.ru', 'viperovm@gmail.com'])
    if reason == 'education':
        subject = 'Получена заявка на обучение в ИДАБ'
        message = 'Получена заявка на обучение в ИДАБ \n Имя: {}, \n email: {}, \n тел: {}, \n доп иформация: {}'.format(data['name'], data['email'], data['phone'], data['info'])
        send_mail(subject, message, 'idab.guu@gmail.com',['annadenisova@mail.ru', 'vpetrunenko00@mail.ru', 'viperovm@gmail.com'])

class EventBidSerializer(serializers.Serializer):
    event_id = serializers.IntegerField()
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = PhoneNumberField()
    
    def create(self, validated_data):
        event = validated_data.pop('event_id')
        event = Event.objects.get(pk=event)
        subject = 'Ваша заявка на участие в мероприятии ИДАБ принята'
        message = 'Уважаемый(ая) {}, Ваша заявка на участие в мероприятии ИДАБ "{}" полученна'.format(validated_data['name'], event.title)
        send_mail(subject, message, 'idab.guu@gmail.com',[validated_data['email']])
        eventbid = EventBid.objects.create(event=event, **validated_data)
        send_to_admin(validated_data, event.title, 'event')
        return eventbid


class ProgramBidSerializer(serializers.Serializer):
    program_id = serializers.IntegerField()
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = PhoneNumberField()
    company = serializers.CharField(max_length=25)
    position = serializers.CharField(max_length=255)
    work_experience = serializers.IntegerField()
    education = serializers.CharField(max_length=255)
    
    def create(self, validated_data):
        program = validated_data.pop('program_id')
        program = Program.objects.get(pk=program)
        subject = 'Ваша заявка на учебу в ИДАБ принята'
        message = 'Уважаемый(ая) {}, Ваша заявка на обучение в ИДАБ по программе "{}" получена. Мы свяжемся с вами в ближайшее время.'.format(validated_data['name'], program.name)
        send_mail(subject, message, 'idab.guu@gmail.com',[validated_data['email']])
        programbid = ProgramBid.objects.create(program=program, **validated_data)
        send_to_admin(validated_data, program.name, 'program')
        return programbid


class PlanBidSerializer(serializers.Serializer):
    program_id = serializers.IntegerField()
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = PhoneNumberField()
    # company = serializers.CharField(max_length=25)
    # position = serializers.CharField(max_length=255)
    # work_experience = serializers.IntegerField()
    # education = serializers.CharField(max_length=255)
    
    def create(self, validated_data):
        program = validated_data.pop('program_id')
        program = Program.objects.get(pk=program)
        file_uri = self.context['request'].build_absolute_uri(program.training_plan.url)
        subject = 'Учебный план'
        message = 'Уважаемый(ая) {}, Вы можете скачать учебный план по программе ИДАБ "{}" по ссылке: {}'.format(validated_data['name'], program.name, file_uri)
        send_mail(subject, message, 'idab.guu@gmail.com',[validated_data['email']])
        planbid = PlanBid.objects.create(program=program, **validated_data)
        send_to_admin(validated_data, program.name, 'plan')
        return planbid


class EducationBidSerializer(serializers.Serializer):
    info = serializers.CharField(allow_blank=True)
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    phone = PhoneNumberField()
    
    def create(self, validated_data):
        subject = 'Ваша заявка на обучение в ИДАБ принята'
        message = 'Уважаемый(ая) {}, Ваша заявка на обучение в ИДАБ полученна. Мы свяжемся с вами в ближайшее время.'.format(validated_data['name'])
        send_mail(subject, message, 'idab.guu@gmail.com',[validated_data['email']])
        educationbid = EducationBid.objects.create(**validated_data)
        send_to_admin(validated_data, '', 'education')
        return educationbid