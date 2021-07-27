from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'lk/courses_blocks', LkCoursesBlockViewSet, basename='lk_courses_block')
router.register(r'lk/courses', LkCourseViewSet, basename='lk_course')

urlpatterns = router.urls