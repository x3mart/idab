from programs.models import TrainingGroupBasic
from tutorials.models import Tutorial
from rest_framework import serializers


class LkTutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        exclude = ('training_groups', 'courses')
    
    def create(self, validated_data):
        request = self.context['request']
        training_groups = request.data.get('training_groups')
        if training_groups is not None:
            training_groups = TrainingGroupBasic.objects.get(pk=training_groups)
        else:
            raise serializers.ValidationError({
                'training_groups': 'Обязательное поле!'
            })
        tutorial = Tutorial(**validated_data)
        tutorial.save()
        tutorial.training_groups.add(training_groups)
        return tutorial

    def update(self, instance, validated_data):
        tutorial = super().update(instance, validated_data)
        request = self.context['request']
        training_groups = request.data.get('training_groups')
        if training_groups is not None:
            training_groups = TrainingGroupBasic.objects.get(pk=training_groups)
            tutorial.training_groups.add(training_groups)
        return tutorial 
