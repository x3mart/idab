from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .serializers import LkLibrarySerializer
from .models import Library

class LibraryPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth
        return request.auth and (request.user.is_staff or request.user.is_teacher)

# Create your views here.
class LkLibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LkLibrarySerializer
    permission_classes = [LibraryPermission]