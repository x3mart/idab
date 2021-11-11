from django.db.models import fields
from checkpoints.serializers import CheckpointMarkSerializer, CheckpointSerializer, CheckpointsNameSerializer
from programs.models import TrainingGroup
from rest_framework import serializers
from programs.serializers import LkTrainingGroupSerializer
from .models import Schedule
from users.models import Student, Teacher
from checkpoints.models import Checkpoint, CheckpointsName
from courses.models import Course


class LkScheduleSerializer(serializers.ModelSerializer):
    teacher = serializers.CharField(read_only=True, source='teacher.name')
    training_group = serializers.IntegerField(read_only=True, source='training_group.id')
    course = serializers.CharField(read_only=True)
    checkpoint_names = serializers.SerializerMethodField(read_only=True,)
    checkpoint = CheckpointSerializer(read_only=True)
    class Meta:
        model = Schedule
        fields = '__all__'

    def get_checkpoint_names(self, obj):
        checkpoint_names = CheckpointsName.objects.all()
        return CheckpointsNameSerializer(checkpoint_names, many=True).data
    
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
        if course:
            course = Course.objects.get(pk=course)
        else:
            raise serializers.ValidationError({
                'course': 'Обязательное поле!'
            })
        schedule = Schedule(**validated_data)
        schedule.training_group=training_group
        schedule.teacher=teacher
        schedule.course=course
        if checkpoint:
            basic = checkpoint['basic']
            decription = checkpoint['description']
            checkpoint = Checkpoint.objects.create(basic=basic, decription=decription)
            schedule.checkpoint=checkpoint
        schedule.save()
        return schedule

    def update(self, instance, validated_data):
        request = self.context['request']
        training_group = request.data.get('training_group')
        teacher = request.data.get('teacher')
        checkpoint = request.data.get('checkpoint')
        if training_group:
            training_group = TrainingGroup.objects.get(pk=training_group)
            validated_data['training_groups']=training_group
        if teacher:
            teacher = Teacher.objects.get(pk=teacher)
            validated_data['teacher']=teacher
        if checkpoint:
            pass
            # basic = checkpoint['basic']
            # decription = checkpoint.get('description')
            # checkpoint = Checkpoint.objects.create(basic=basic, decription=decription)
            # validated_data['checkpoint']=checkpoint
        schedule = super().update(instance, validated_data)
        return schedule


class ScheduleAttendanceSerializer(serializers.ModelSerializer):
    training_group = LkTrainingGroupSerializer(read_only=True, many=False)
    visited_students = serializers.SerializerMethodField(read_only=True)
    checkpoint_names = serializers.SerializerMethodField(read_only=True,)

    class Meta:
        model = Schedule
        fields = '__all__'
    
    def get_checkpoint_names(self, obj):
        checkpoint_names = CheckpointsName.objects.all()
        return CheckpointsNameSerializer(checkpoint_names, many=True).data
    
    def update(self, instance, validated_data):
        request = self.context['request']
        students = request.data.get('visited_students')
        validated_data.clear()
        instance.visited_students.clear()
        students = Student.objects.filter(pk__in=students)
        for student in students:
            instance.visited_students.add(student)
        schedule = super().update(instance, validated_data)
        return schedule
    
    def get_visited_students(self, obj):
        students = obj.visited_students.values_list('id', flat=True)
        return students


class ScheduleCheckpointSerializer(serializers.ModelSerializer):
    training_group = LkTrainingGroupSerializer(read_only=True, many=False)
    students_marks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Schedule
        fields = '__all__'
    
    
    def update(self, instance, validated_data):
        request = self.context['request']
        students_marks = request.data.get('students_marks')
        validated_data.clear()
        instance.checkpoint.chekpoint_marks.all().delete()
        schedule = super().update(instance, validated_data)
        for students_mark in students_marks:
            student = Student.objects.filter(pk=students_mark['student']).first()
            instance.checkpoint.student = student
            instance.checkpoint.chekpoint_marks.create(mark=students_mark['mark'], student=student)
            instance.checkpoint.save()
        return schedule
    
    def get_students_marks(self, obj):
        students_marks = obj.checkpoint.chekpoint_marks.all()
        return CheckpointMarkSerializer(students_marks, many=True).data
