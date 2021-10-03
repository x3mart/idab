from rest_framework import serializers
from studymaterials.models import StudyMaterial
from programs.models import TrainingGroup


class LkStudyMaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyMaterial
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']
        training_groups = request.data.get('training_groups')
        if training_groups is not None:
            training_groups = list(map(int, training_groups.split()))
            training_groups = TrainingGroup.objects.filter(id__in=training_groups)
        else:
            raise serializers.ValidationError({
                'training_groups': 'Обязательное поле!'
            })
        material = StudyMaterial(**validated_data)
        material.save()
        for training_group in training_groups:
            material.training_groups.add(training_group)
        return material