from datetime import datetime, timedelta
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .serializers import LkScheduleSerializer
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
        return Schedule.objects.filter(start_date__gte=month_ago)
