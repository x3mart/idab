from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import Course, CoursesBlock  
from .serializers import LkCoursesBlockSerializer, LkCourseSerializer

# Create your views here.
class IsAdminOrReadOnlyPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.auth
        return request.user and request.user.is_staff           


class LkCoursesBlockViewSet(viewsets.ModelViewSet):
    queryset = CoursesBlock.objects.all()
    serializer_class = LkCoursesBlockSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]


class LkCourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = LkCourseSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]
