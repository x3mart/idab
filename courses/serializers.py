from rest_framework import serializers
from .models import Course, CoursesBlock  



class LkCoursesBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesBlock
        fields = '__all__'


class LkCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'