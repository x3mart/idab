from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from users.models import Student
from .serializers import LkTaskSerializer, LkSolutionSerializer, LkTaskStudentSerializer, SolutionMarkSerializer
from .models import Solution, Task

class TaskPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth and (request.user.is_student or request.user.is_teacher)
        return request.auth and request.user.is_teacher


class SolutionPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth
        return request.auth and (request.user.is_student or request.user.is_teacher)
    
    def has_object_permission(self, request, view, obj):
        if view.action == 'create':
            request.auth and request.user.is_student
        return request.auth and (obj.student.id == request.user.id or request.user.is_teacher)


class LkTaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = LkTaskSerializer
    permission_classes = [TaskPermission]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['training_group']

    def get_serializer(self, *args, **kwargs):
        user = self.request.user 
        if user.is_student:
            return LkTaskStudentSerializer
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        user = self.request.user 
        students = Student.objects.all()
        if user.is_student:
            return Task.objects.filter(students__pk=user.id).prefetch_related('solutions')
        if user.is_teacher:
            return Task.objects.filter(teacher__pk=user.id).prefetch_related('students')
        return None
    
    @action(detail=True, methods=['post'])
    def solution(self, request, pk=None):
        task = self.get_object()
        student = Student.objects.get(pk=request.user.id)
        serializer = LkSolutionSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if not self.request.user.is_teacher and self.request.data.get('mark'):
            self.request.data.pop('mark', None)
        Solution.objects.create(task=task, student=student, **data)
        return Response(LkTaskStudentSerializer(task, many=False, context={'task':task.id}).data, status=status.HTTP_201_CREATED)


class LkSolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionMarkSerializer
    permission_classes = [SolutionPermission]

    def get_queryset(self):
        user = self.request.user
        if user.is_student:
            return Solution.objects.filter(student__pk=user.id)
        if user.is_teacher:
            return Solution.objects.filter(task__teacher__pk=user.id)
        return None

    def perform_update(self, serializer):
        if not self.request.user.is_teacher and self.request.data.get('mark'):
            self.request.data.pop('mark')
        return super().perform_update(serializer)