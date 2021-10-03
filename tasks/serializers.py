from programs.models import TrainingGroup
from rest_framework import serializers

from users.serializers import LkStudentSerializer, LkTeacherSerializer
from .models import Task
from users.models import Teacher, Student


class LkTaskSerializer(serializers.ModelSerializer):
    teacher = LkStudentSerializer(read_only=True, many=False)
    students = LkTeacherSerializer(read_only=True, many=True)
    class Meta:
        model = Task
        fields = '__all__'
    
    def create(self, validated_data):
        tasks = []
        request = self.context['request']
        students = request.data.get('students')
        teacher = request.data.get('teacher')
        if students is not None:
            students = TrainingGroup.objects.filter(pk__in=students)
        else:
            raise serializers.ValidationError({
                'students': 'Обязательное поле!'
            })
        if teacher is not None:
            teacher = Teacher.objects.get(pk=teacher)
        else:
            raise serializers.ValidationError({
                'teacher': 'Обязательное поле!'
            })
        for student in students:
            task = Task(**validated_data)
            task.teacher=teacher
            task.student=student
            tasks.append(task)
        tasks = Task.objects.bulk_create(students)
        return tasks

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
