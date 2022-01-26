from ratings.serializers import StudentRatingSerializer
from schedule.models import Schedule
from schedule.serializers import LkScheduleSerializer
from utils.image_crop import create_avatar
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework import serializers
from .models import Student, User, Teacher
from programs.models import TrainingGroup
import datetime
from djoser.serializers import UserSerializer as MeSerializer

User = get_user_model()

def mail_to_new_user(user, password):
    subject = 'Доступ в личный кабинет ИДАБ'
    message = 'Уважаемый, {}. \n Вам предоставлен доступ в личный кабинет ИДАБ, \n https://idab.mba/login \n email: {}, \n пароль: {}'.format(user.name, user.email, password)
    send_mail(subject, message, 'idab.guu@gmail.com',['viperovm@gmail.com', 'x3mart@gmail.com', user.email])


class StaffSerializer(MeSerializer):
    schedule_for_today = serializers.SerializerMethodField(read_only=True,)

    class Meta(MeSerializer.Meta):
        model = User
        fields = '__all__'


    def get_schedule_for_today(self, obj):
        training_group = obj.training_group.first()
        schedule = Schedule.objects.filter(training_group=training_group).filter(start_date__date=datetime.date.today())
        return LkScheduleSerializer(schedule, many=True).data


class MyUserCreateSerializer(BaseUserRegistrationSerializer):
    schedule_for_today = serializers.SerializerMethodField(read_only=True,)
    class Meta(BaseUserRegistrationSerializer.Meta):
        model = User
        fields = '__all__'
        depth = 0
        extra_kwargs = {'password': {'write_only': True},
        }
    
    def get_schedule_for_today(self, obj):
        schedule = Schedule.objects.filter(start_date__date=datetime.date.today())
        return LkScheduleSerializer(schedule, many=True).data


class TrainingGroupSerializer(serializers.ModelSerializer):
    program = serializers.CharField(source='basic.program.name', read_only=True)
    basic = serializers.CharField(source='basic.name', read_only=True)
    progress = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = TrainingGroup
        fields = '__all__'
        depth = 0
    
    def get_progress(self, obj):
        if int((obj.graduation_date - datetime.date.today()).days) <= 0:
            return 100
        if int((datetime.date.today() - obj.start_date).days) <= 0:
            return 0
        return int(((datetime.date.today() - obj.start_date).days/(obj.graduation_date - obj.start_date).days)*100)


class LkStudentSerializer(serializers.ModelSerializer):
    training_group = TrainingGroupSerializer(read_only=True, many=True)
    password = serializers.CharField(write_only=True, min_length=8, required=False)
    schedule_for_today = serializers.SerializerMethodField(read_only=True,)
    rating = StudentRatingSerializer(read_only=True, many=False)
    # re_password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        read_only_fields = ['id', 'last_login']
        model = Student
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }

    def create(self, validated_data):
        request = self.context['request']
        training_group = request.data.get('training_group')
        if training_group is not None:
            training_group = TrainingGroup.objects.get(pk=training_group)
        else:
            raise serializers.ValidationError({
                'training_group': 'Обязательное поле!'
            }) 
        student = Student(**validated_data)
        password = get_random_string(length=10)
        student.set_password(password)
        student.is_student = True
        student.is_active = True
        student.save()
        student.training_group.add(training_group)
        mail_to_new_user(student, password)
        if student.avatar:
            create_avatar(student.avatar)
        return student
    
    def update(self, instance, validated_data):
        student = super().update(instance, validated_data)
        request = self.context['request']
        training_group = request.data.get('training_group')
        if training_group is not None and training_group != instance.training_group and request.user.is_staff:
            if request.data.get('group_to_delete'):
                group_to_delete = TrainingGroup.objects.get(pk=request.data.get('group_to_delete'))
                student.training_group.remove(group_to_delete)
            training_group = TrainingGroup.objects.get(pk=training_group)
            student.training_group.add(training_group)
        if validated_data.get('avatar'):
            create_avatar(student.avatar)
        return student
    
    def get_schedule_for_today(self, obj):
        training_group = obj.training_group.first()
        schedule = Schedule.objects.filter(training_group=training_group).filter(start_date__date=datetime.date.today())
        return LkScheduleSerializer(schedule, many=True).data


class LkTeacherSerializer(serializers.ModelSerializer):
    schedule_for_today = serializers.SerializerMethodField(read_only=True,)

    class Meta:
        model = Teacher
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        read_only_fields = ['id', 'last_login']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }
        
    def create(self, validated_data):
        teacher = Teacher(**validated_data)
        password = get_random_string(length=10)
        teacher.set_password(password)
        teacher.is_active = True
        teacher.is_teacher = True
        teacher.save()
        mail_to_new_user(teacher, password)
        if teacher.avatar:
            create_avatar(teacher.avatar)
        return teacher
    
    def update(self, instance, validated_data):
        teacher = super().update(instance, validated_data)
        if validated_data.get('avatar'):
            create_avatar(teacher.avatar)
        return teacher
    
    def get_schedule_for_today(self, obj):
        schedule = Schedule.objects.filter(teacher=obj).filter(start_date__date=datetime.date.today())
        return LkScheduleSerializer(schedule, many=True).data
