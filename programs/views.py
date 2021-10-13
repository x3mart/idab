from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from .models import Program, TrainingGroup, Category, TrainingGroupBasic
from .serializers import LkCategorySerializer, LkProgramSerializer, LkTrainingGroupBasicSerializer, LkTrainingGroupSerializer, TrainingGroupAttendaceSerializer

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



class LkProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = LkProgramSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if self.action == 'list' and category is not None:
            return Program.objects.filter(category=category)
        return super().get_queryset()



class LkTrainingGroupBasicViewSet(viewsets.ModelViewSet):
    queryset = TrainingGroupBasic.objects.all()
    serializer_class = LkTrainingGroupBasicSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]


class LkTrainingGroupViewSet(viewsets.ModelViewSet):
    queryset = TrainingGroup.objects.all()
    serializer_class = LkTrainingGroupSerializer
    permission_classes = [IsAdminOrReadOnlyPermission]

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if self.action == 'list' and category is not None:
            return TrainingGroup.objects.filter(basic__category=category)
        return super().get_queryset()
    
    def get_serializer(self, *args, **kwargs):
        if self.action == 'attendances':
            return TrainingGroupAttendaceSerializer(*args, **kwargs)
        return super().get_serializer(*args, **kwargs)
    
    @action(["get"], detail=True)
    def attendances(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)