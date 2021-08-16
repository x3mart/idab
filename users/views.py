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
        if view.action in ['create', 'destroy',]:
            return request.auth and request.user.is_staff
        return request.auth           

    def has_object_permission(self, request, view, obj):
        if view.action in ['update', 'partial_update',]:
            return obj.id == request.user.id or request.user.is_staff
        else:
            return True
    
    
class LkStudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = LkStudentSerializer
    permission_classes = [LkUserPermission]

    def perform_create(self, serializer):
        try:
            training_group = TrainingGroup.objects.get(pk=self.request.data['training_group'])
        except:
            raise serializers.ValidationError({"training_group": "Обязательное поле!"})
        serializer.save(training_group=training_group)

    def perform_update(self, serializer):
        if self.request.auth and self.request.user.is_staff:
            try:
                training_group = TrainingGroup.objects.get(pk=self.request.data['training_group'])
                serializer.save(training_group=training_group)
            except:
                raise serializers.ValidationError({"training_group": "Вероятно такой группы не существует!"})
        serializer.save()

class LkTeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = LkTeacherSerializer
    permission_classes = [LkUserPermission]


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