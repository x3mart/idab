from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS

from users.models import Student
from .serializers import LkTaskSerializer, LkSolutionSerializer
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

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        user = self.request.user 
        students = Student.objects.prefetch_related('training_group') 
        if user.is_student:
            return Task.objects.filter(students__pk=user.id)
        if user.is_teacher:
            return Task.objects.filter(teacher__pk=user.id)
        return None



class LkSolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = LkSolutionSerializer
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