from courses.models import CoursesBlock
from rest_framework import serializers

from schedule.models import Schedule
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
    basic = serializers.IntegerField(source='basic.id', read_only=True)
    category = serializers.CharField(source='basic.category.name', read_only=True)
    courses_blocks = ShorCoursesBlockSerializer(many=True, read_only=True, source='basic.program.courses_blocks')
    
    class Meta:
        model = TrainingGroup
        fields = ['id', 'category', 'basic', 'name', 'start_date', 'graduation_date', 'students', 'courses_blocks']
        extra_kwargs = {
            'basic': {'write_only': True},
        }

class ScheduleAttendanceReporteSerializer(serializers.ModelSerializer):
    visited_students = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Schedule
        exclude = ('training_group',)
        depth = 0
    
    def get_visited_students(self, obj):
        students = obj.visited_students.values_list('id', flat=True)
        return students


class TrainingGroupAttendaceSerializer(serializers.ModelSerializer):
    students = ShorStudentSerializer(many=True, read_only=True)
    name = serializers.CharField(source='basic.name', read_only=True)
    basic = serializers.IntegerField(source='basic.id', read_only=True)
    schedule = ScheduleAttendanceReporteSerializer(many=True, read_only=True)
    
    class Meta:
        model = TrainingGroup
        fields = ['id', 'name', 'basic', 'start_date', 'graduation_date', 'students', 'schedule']
        extra_kwargs = {
            'basic': {'write_only': True},
        }