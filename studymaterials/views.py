from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .serializers import LkStudyMaterialSerializer
from .models import StudyMaterial
from users.models import Student

class StudyMaterialPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.auth
        return request.auth and (request.user.is_staff or request.user.is_teacher)

# Create your views here.
class LkStudyMaterialViewSet(viewsets.ModelViewSet):
    queryset = StudyMaterial.objects.all()
    serializer_class = LkStudyMaterialSerializer
    permission_classes = [StudyMaterialPermission]

    def get_queryset(self):
        user = self.request.user
        if user.is_student:
            user = Student.objects.get(pk=user.id)
            return StudyMaterial.objects.filter(training_group=user.training_group)
        return super().get_queryset()
