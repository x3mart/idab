from .models import Student, Teacher
from programs.models import TrainingGroup
from .serializers import LkStudentSerializer, LkTeacherSerializer
from rest_framework.permissions import AllowAny, BasePermission, SAFE_METHODS
from rest_framework import viewsets
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class LkUserPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.auth
        elif view.action in ['create', 'destroy',]:
            return request.user and request.user.is_staff
        else:
            return True           

    def has_object_permission(self, request, view, obj):
        if view.action in ['update', 'partial_update',]:
            return obj.id == request.user.id or request.user.is_staff
        else:
            return True
    
    
class LkStudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = LkStudentSerializer
    permission_classes = [LkUserPermission, AllowAny]

    def perform_create(self, serializer):
        try:
            traning_group = TrainingGroup.objects.get(pk=self.request.data['traning_group'])
            serializer.save(traning_group=traning_group)
        except:
            raise serializers.ValidationError({"traning_group": "Обязательное поле"})

    def perform_update(self, serializer):
        if self.request.user and self.request.user.is_staff:
            try:
                traning_group = TrainingGroup.objects.get(pk=self.request.data['traning_group'])
                serializer.save(traning_group=traning_group)
            except:
                pass
        serializer.save()

class LkTeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = LkTeacherSerializer
    permission_classes = [LkUserPermission, AllowAny]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_staff'] = user.is_staff
        token['is_student'] = user.is_student
        token['is_teacher'] = user.is_teacher
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer