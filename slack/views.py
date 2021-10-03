from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .serializers import LkSlackSerializer
from .models import Slack

class SlackPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth
        return request.auth and request.user.is_staff

# Create your views here.
class LkSlackiewSet(viewsets.ModelViewSet):
    queryset = Slack.objects.all()
    serializer_class = LkSlackSerializer
    permission_classes = [SlackPermission]