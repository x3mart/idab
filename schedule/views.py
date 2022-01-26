from datetime import datetime, timedelta
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from rest_framework.decorators import action
from users.models import Student
from .serializers import LkScheduleSerializer, ScheduleAttendanceSerializer, ScheduleCheckpointSerializer
from .models import Schedule

# Create your views here.
class SchedulePermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth
        return request.auth and (request.user.is_staff or request.user.is_teacher)


class LkScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = LkScheduleSerializer
    permission_classes = [SchedulePermission]

    def get_queryset(self):
        month_ago = datetime.today() - timedelta(days=30)
        schedule = Schedule.objects.filter(start_date__gte=month_ago)
        user = self.request.user
        if user.is_teacher:
            schedule = schedule.filter(teacher__pk=user.id)
        if user.is_student:
            user = Student.objects.filter(pk=user.id)
            user.training_groups =user.values_list('training_group__id', flat=True)
            schedule  = schedule.filter(training_group__in=user.training_groups)
        return schedule
    
    def get_serializer(self, *args, **kwargs):
        if self.action == 'attendances':
            return ScheduleAttendanceSerializer(*args, **kwargs, context={'request':self.request})
        if self.action == 'checkpoint':
            return ScheduleCheckpointSerializer(*args, **kwargs, context={'request':self.request})
        return super().get_serializer(*args, **kwargs)

    @action(["get", "patch"], detail=True)
    def attendances(self, request, *args, **kwargs):
        if request.method == "GET":
            return self.retrieve(request, *args, **kwargs)
        if request.method == "PATCH":
            return self.partial_update(request, *args, **kwargs)
    

    @action(["get", "patch"], detail=True)
    def checkpoint(self, request, *args, **kwargs):
        if request.method == "GET":
            return self.retrieve(request, *args, **kwargs)
        if request.method == "PATCH":
            return self.partial_update(request, *args, **kwargs)

