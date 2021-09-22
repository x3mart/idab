from programs.models import TrainingGroup
from rest_framework import serializers
from .models import Schedule
from users.models import Teacher
from checkpoints.models import Checkpoint


class LkScheduleSerializer(serializers.ModelSerializer):
    teacher = serializers.CharField(read_only=True, source='teacher.name')
    training_group = serializers.CharField(read_only=True, source='training_group.__str__')
    class Meta:
        model = Schedule
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']
        training_group = request.data.get('training_group')
        teacher = request.data.get('teacher')
        checkpoint = request.data.get('checkpoint')
        if training_group is not None:
            training_groups = Teacher.objects.get(pk=training_group)
        else:
            raise serializers.ValidationError({
                'training_group': 'Обязательное поле!'
            })
        if teacher is not None:
            teacher = TrainingGroup.objects.get(pk=teacher)
        else:
            raise serializers.ValidationError({
                'teacher': 'Обязательное поле!'
            })
        shedule = Schedule(**validated_data)
        shedule.save()
        if checkpoint is not None:
            checkpoint = Checkpoint.objects.get(pk=checkpoint)
            shedule.checkpoint.add(checkpoint)
        shedule.training_group.add(training_groups)
        shedule.teacher.add(teacher)
        return shedule

    def update(self, instance, validated_data):
        shedule = super().update(instance, validated_data)
        request = self.context['request']
        training_group = request.data.get('training_group')
        teacher = request.data.get('teacher')
        checkpoint = request.data.get('checkpoint')
        if training_group is not None and instance.training_group.id is not training_group:
            training_group = TrainingGroup.objects.get(pk=training_group)
            shedule.training_groups.remove(instance.training_group)
            shedule.training_groups.add(training_group)
        if teacher is not None and instance.teacher.id is not teacher:
            teacher = Teacher.objects.get(pk=teacher)
            shedule.teacher.remove(instance.teacher)
            shedule.teacher.add(teacher)
        if checkpoint is not None and instance.checkpoint is not None and instance.checkpoint.id is not checkpoint:
            checkpoint = Checkpoint.objects.get(pk=checkpoint)
            shedule.checkpoint.remove(instance.checkpoint)
            shedule.checkpoint.add(checkpoint)
        if checkpoint is None and instance.checkpoint is not None:
            shedule.checkpoint.remove(instance.checkpoint)
        if checkpoint is not None and instance.checkpoint is None:
            teacher = Checkpoint.objects.get(pk=checkpoint)
            shedule.checkpoint.add(checkpoint)
        return shedule 
