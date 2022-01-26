from django.db.models import fields
from rest_framework import serializers
from checkpoints.serializers import CheckpointMarkSerializer
from programs.models import TrainingGroup
from ratings.models import Rating

from users.models import Student

class TrainingGroupSerializer(serializers.ModelSerializer):
    schedule_count = serializers.IntegerField()
    class Meta:
        model =TrainingGroup
        fields = ['id', 'schedule_count']

class StudentRatingSerializer(serializers.ModelSerializer):
    total_rating = serializers.IntegerField(read_only=True)
    class Meta:
        model = Rating
        fields = '__all__'