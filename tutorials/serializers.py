from programs.models import TrainingGroupBasic
from tutorials.models import Tutorial
from rest_framework import serializers


class LkTutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        exclude = ('groups', 'courses')
    
    def create(self, validated_data):
        request = self.context['request']
        groups = request.data.get('groups')
        if groups is not None:
            groups = TrainingGroupBasic.objects.get(pk=groups)
        else:
            raise serializers.ValidationError({
                'groups': 'Обязательное поле!'
            })
        tutorial = Tutorial(**validated_data)
        tutorial.groups = groups
        tutorial.save()
        return tutorial

    def update(self, instance, validated_data):
        tutorial = super().update(instance, validated_data)
        request = self.context['request']
        groups = request.data.get('groups')
        if groups is not None:
            groups = TrainingGroupBasic.objects.get(pk=groups)
            tutorial.groups.add(groups)
        return tutorial 
