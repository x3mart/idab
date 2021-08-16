from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework import serializers
from .models import Student, User, Teacher
from programs.models import TrainingGroup

User = get_user_model()

def mail_to_new_user(user, password):
    subject = 'Доступ в личный кабинет ИДАБ'
    message = 'Уважаемый, {}. \n Вам предоставлен доступ в личный кабинет ИДАБ, \n https://idab.mba/login \n email: {}, \n пароль: {}'.format(user.name, user.email, password)
    send_mail(subject, message, 'idab.guu@gmail.com',['viperovm@gmail.com', 'x3mart@gmail.com', user.email])

class MyUserCreateSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        model = User
        fields = '__all__'
        depth = 0
        extra_kwargs = {'password': {'write_only': True},
        'traning_group': {'write_only': True, 'required': False}
        }


class TrainingGroupSerializer(serializers.ModelSerializer):
    program = serializers.CharField(source='basic.program.name', read_only=True)
    basic = serializers.CharField(source='basic.name', read_only=True)
    class Meta:
        model = TrainingGroup
        fields = '__all__'
        depth = 0


class LkStudentSerializer(serializers.ModelSerializer):
    training_group = TrainingGroupSerializer(read_only=True)
    password = serializers.CharField(write_only=True, min_length=8, required=False)
    # re_password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        read_only_fields = ['id', 'last_login']
        model = Student
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }

    def create(self, validated_data):
        student = Student(**validated_data)
        password = get_random_string(length=10)
        student.set_password(password)
        student.is_student = True
        student.is_active = True
        student.save()
        mail_to_new_user(student, password)
        return student


class LkTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        read_only_fields = ['id', 'last_login']
        extra_kwargs = {
            'password': {'write_only': True},
        }
        
    def create(self, validated_data):
        re_password = self.context['request'].data['re_password']
        password = validated_data.pop('password')
        if password != re_password:
            raise serializers.ValidationError('Пароли должны совпадать')
        teacher = Teacher(**validated_data)
        teacher.set_password(password)
        teacher.is_active = True
        teacher.is_teacher = True
        teacher.save()
        mail_to_new_user(teacher, password)
        return teacher
