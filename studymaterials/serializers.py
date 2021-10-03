from rest_framework import serializers
from studymaterials.models import StudyMaterial


class LkStudyMaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyMaterial
        fields = '__all__'