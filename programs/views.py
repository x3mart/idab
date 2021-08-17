from rest_framework import viewsets
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .models import Program, TrainingGroup, Category, TrainingGroupBasic
from .serializers import LkCategorySerializer, LkProgramSerializer, LkTrainingGroupBasicSerializer, LkTrainingGroupSerializer

# Create your views here.
class IsAdminOrReadOnlyPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.auth
        return request.user and request.user.is_staff           


class LkCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = LkCategorySerializer
    permission_classes = [IsAdminOrReadOnlyPermission]
    lookup_field = 'slug'


class LkProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = LkProgramSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]
    lookup_field = 'slug'


class LkTrainingGroupBasicViewSet(viewsets.ModelViewSet):
    queryset = TrainingGroupBasic.objects.all()
    serializer_class = LkTrainingGroupBasicSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]


class LkTrainingGroupViewSet(viewsets.ModelViewSet):
    queryset = TrainingGroup.objects.all()
    serializer_class = LkTrainingGroupSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]

    def get_queryset(self):
        program = self.request.query_params.get('program')
        if self.action == 'list' and program is not None:
            return TrainingGroup.objects.filter(basic__program=program)
        return super().get_queryset()