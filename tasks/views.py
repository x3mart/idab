from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .serializers import LkTaskSerializer
from .models import Task

class TaskPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth
        return request.auth and (request.user.is_staff or request.user.is_teacher)


class LkTaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = LkTaskSerializer
    permission_classes = [AllowAny]