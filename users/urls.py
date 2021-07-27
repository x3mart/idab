from .views import LkTeacherViewSet, LkStudentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'lk/students', LkStudentViewSet, basename='lk_student')
router.register(r'lk/teachers', LkTeacherViewSet, basename='lk_teacher')

urlpatterns = router.urls