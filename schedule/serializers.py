from attendances.models import Attendance
from programs.models import TrainingGroup
from rest_framework import serializers

from programs.serializers import LkTrainingGroupSerializer
from .models import Schedule
from users.models import Student, Teacher
from checkpoints.models import Checkpoint
from courses.models import Course


class LkScheduleSerializer(serializers.ModelSerializer):
    teacher = serializers.CharField(read_only=True, source='teacher.name')
    training_group = serializers.IntegerField(read_only=True, source='training_group.id')
    course = serializers.CharField(read_only=True)
    class Meta:
        model = Schedule
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']
        training_group = request.data.get('training_group')
        teacher = request.data.get('teacher')
        checkpoint = request.data.get('checkpoint')
        course = request.data.get('course')
        if training_group is not None:
            training_group = TrainingGroup.objects.get(pk=training_group)
        else:
            raise serializers.ValidationError({
                'training_group': 'Обязательное поле!'
            })
        if teacher is not None:
            teacher = Teacher.objects.get(pk=teacher)
        else:
            raise serializers.ValidationError({
                'teacher': 'Обязательное поле!'
            })
        if course is not None:
            course = Course.objects.get(pk=course)
        else:
            raise serializers.ValidationError({
                'course': 'Обязательное поле!'
            })
        schedule = Schedule(**validated_data)
        schedule.training_group=training_group
        schedule.teacher=teacher
        schedule.course=course
        if checkpoint is not None:
            checkpoint = Checkpoint.objects.get(pk=checkpoint)
            schedule.checkpoint=checkpoint
        schedule.save()
        return schedule

    def update(self, instance, validated_data):
        request = self.context['request']
        training_group = request.data.get('training_group')
        teacher = request.data.get('teacher')
        checkpoint = request.data.get('checkpoint')
        if training_group is not None:
            training_group = TrainingGroup.objects.get(pk=training_group)
            validated_data['training_groups']=training_group
        if teacher is not None:
            teacher = Teacher.objects.get(pk=teacher)
            validated_data['teacher']=teacher
        if checkpoint is not None:
            checkpoint = Checkpoint.objects.get(pk=checkpoint)
            validated_data['checkpoint']=checkpoint
        if checkpoint is None:
            validated_data['checkpoint']=None
        schedule = super().update(instance, validated_data)
        return schedule


class ScheduleStudentAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id']
    
    def get_attendance(self, obj):
        return obj.attendances.filter()

class ScheduleAttendanceSerializer(serializers.ModelSerializer):
    training_group = LkTrainingGroupSerializer(read_only=True, many=False)
    visited_students = ScheduleStudentAttendanceSerializer(read_only=True, many=True)

    class Meta:
        model = Schedule
        fields = '__all__'
    
    def update(self, instance, validated_data):
        request = self.context['request']
        students = request.data.get('students')
        validated_data.clear()
        schedule = super().update(instance, validated_data)
        students = Student.objects.filter(pk__in=students)
        for student in students:
            schedule.visited_students.add(student)
        return schedule

