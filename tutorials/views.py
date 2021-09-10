from tutorials.serializers import LkTutorialSerializer
from users.models import Student
from tutorials.models import Tutorial
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS

# Create your views here.

class TutorialPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.auth
        return request.user and (request.user.is_staff or request.user.is_teacher)


class LkTutorialViewSet(viewsets.ModelViewSet):
    queryset = Tutorial.objects.all()
    serializer_class = LkTutorialSerializer
    permission_classes = [TutorialPermission]

    def get_queryset(self):
        if self.request.auth and self.request.user.is_student:
            student = Student.objects.get(pk=self.request.user.id)
            return Tutorial.objects.filter(groups=student.training_group)
        return super().get_queryset()