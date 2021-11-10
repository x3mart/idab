from django.db.models import fields
from rest_framework import serializers
from checkpoints.serializers import CheckpointMarkSerializer
from programs.models import TrainingGroup

from users.models import Student

class TrainingGroupSerializer(serializers.ModelSerializer):
    schedule_count = serializers.IntegerField()
    class Meta:
        model =TrainingGroup
        fields = ['id', 'schedule_count']

class StudentRatingSerializer(serializers.ModelSerializer):
    schedule_count = serializers.SerializerMethodField()
    attendace_count = serializers.IntegerField()
    attendace_rating = serializers.SerializerMethodField()
    checkpoints_count = serializers.SerializerMethodField()
    completed_checkpoints = serializers.IntegerField()
    completed_checkpoints_marks_avg = serializers.IntegerField()
    # checkpoints_sum  = serializers.IntegerField()
    checkpoints_rating = serializers.SerializerMethodField()
    tasks_count = serializers.IntegerField()
    solutions_count = serializers.IntegerField()
    solutions_mark_avg = serializers.IntegerField()
    tasks_rating = serializers.IntegerField()
    # chekpoint_marks = CheckpointMarkSerializer(read_only=True, many=True)
    training_group = serializers.CharField(read_only=True, source='training_group.basic.name')
    class Meta:
        model = Student
        fields = ['id', 'name', 'training_group', 'schedule_count', 'attendace_count', 'attendace_rating', 'checkpoints_count', 'completed_checkpoints', 'completed_checkpoints_marks_avg', 'checkpoints_rating', 'tasks_count', 'solutions_count', 'solutions_mark_avg', 'tasks_rating', 'training_group']
    
    def get_schedule_count(self, obj):
        return obj.training_group.first().schedule_count
    
    def get_checkpoints_count(self, obj):
        return obj.training_group.first().checkpoints_count

    def get_checkpoints_rating(self, obj):
        checkpoints_count = obj.training_group.first().checkpoints_count
        if not checkpoints_count:
            return 0
        return obj.checkpoints_sum/checkpoints_count
    
    def get_attendace_rating(self, obj):
        schedule_count = obj.training_group.first().schedule_count
        if not obj.attendace_count or not schedule_count:
            return 0
        rating_prc = (obj.attendace_count/schedule_count)*100
        if rating_prc >= 80:
            return 30
        if rating_prc in range(60, 79):
            return 20
        if rating_prc in range(50, 59):
            return 10
        if rating_prc in range(30, 49):
            return 10
        return 0
 #  'schedule_count', 'attendace_count', 'attendace_rating_prc', 'checkpoints_rating', 'checkpoints_count',

 # schedule_count = serializers.IntegerField()
    # attendace_count = serializers.IntegerField()
    # attendace_rating_prc = serializers.IntegerField()
    # attendace_rating = serializers.IntegerField()
    # checkpoints_count = serializers.IntegerField()