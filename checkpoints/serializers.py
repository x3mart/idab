from rest_framework import serializers

from checkpoints.models import Checkpoint, CheckpointMark, CheckpointsName


class CheckpointsNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckpointsName
        fields = '__all__'


class CheckpointSerializer(serializers.ModelSerializer):
    basic = serializers.StringRelatedField(many=False)
    class Meta:
        model = Checkpoint
        fields = '__all__'


class CheckpointMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckpointMark
        fields = '__all__'
