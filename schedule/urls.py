from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'lk/schedules', LkScheduleViewSet, basename='lk_schedule')

urlpatterns = router.urls