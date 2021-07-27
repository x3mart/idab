from courses.models import CoursesBlock
from rest_framework import serializers
from .models import Category, Program, TrainingGroup, TrainingGroupBasic
from users.models import Student


class ShorStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name']


class ShorCoursesBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesBlock
        fields = ['id', 'name']

class LkCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class LkProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class LkTrainingGroupBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingGroupBasic
        fields = '__all__'


class LkTrainingGroupSerializer(serializers.ModelSerializer):
    students = ShorStudentSerializer(many=True, read_only=True)
    name = serializers.CharField(source='basic.name', read_only=True)
    category = serializers.CharField(source='basic.program.category.name', read_only=True)
    program = serializers.CharField(source='basic.program.name', read_only=True)
    courses_blocks = ShorCoursesBlockSerializer(many=True, read_only=True, source='basic.program.courses_blocks')
    
    class Meta:
        model = TrainingGroup
        fields = ['id', 'category', 'program', 'name', 'start_date', 'graduation_date', 'students', 'basic', 'courses_blocks']
        extra_kwargs = {
            'basic': {'write_only': True},
        }