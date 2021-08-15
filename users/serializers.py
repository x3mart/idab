from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Student, User, Teacher
from programs.models import TrainingGroup

User = get_user_model()

class MyUserCreateSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        model = User
        fields = '__all__'
        depth = 0
        extra_kwargs = {'password': {'write_only': True},
        'traning_group': {'write_only': True, 'required': False}
        }


class TrainingGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingGroup
        fields = '__all__'
        depth = 0


class LkStudentSerializer(serializers.ModelSerializer):
    training_group = TrainingGroupSerializer(read_only=True)
    password = serializers.CharField(write_only=True, min_length=8)
    # re_password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']
        read_only_fields = ['id', 'last_login']
        model = Student
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        re_password = self.context['request'].data['re_password']
        password = validated_data.pop('password')
        if password != re_password:
            raise serializers.ValidationError('Пароли должны совпадать')
        student = Student(**validated_data)
        student.set_password(password)
        student.is_student = True
        student.is_active = True
        student.save()
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
        return teacher
