from rest_framework.response import Response

from schedule.models import Schedule
from .models import Student, Teacher
from programs.models import TrainingGroup
from .serializers import LkStudentSerializer, LkTeacherSerializer
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from rest_framework import viewsets
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action


class LkUserPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create', 'destroy',]:
            return request.auth and request.user.is_staff
        if view.action == 'attendances':
            return request.auth and (request.user.is_staff or request.user.is_teacher)
        return request.auth           

    def has_object_permission(self, request, view, obj):
        if view.action in ['update', 'partial_update',]:
            return obj.id == request.user.id or request.user.is_staff
        return True
    
    
class LkStudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = LkStudentSerializer
    permission_classes = [LkUserPermission]

    def get_queryset(self):
        training_group = self.request.query_params.get('training_group')
        if self.action == 'list' and training_group is not None:
            return Student.objects.filter(training_group=training_group)
        return super().get_queryset()
    
    @action(["patch"], detail=True)
    def attendances(self, request, *args, **kwargs):
        student = kwargs.get('pk')
        schedule = request.data.get('schedule')
        attendance = request.data.get('attendance')
        student = Student.objects.get(pk=student)
        schedule = Schedule.objects.get(pk=schedule)
        if attendance:
            schedule.visited_students.add(student)
        else:
            schedule.visited_students.remove(student)
        return Response('Ok', status=200)


class LkTeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = LkTeacherSerializer
    permission_classes = [LkUserPermission]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_staff'] = user.is_staff
        token['is_student'] = user.is_student
        token['is_teacher'] = user.is_teacher
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer