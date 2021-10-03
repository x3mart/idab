from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'lk/tasks', LkTaskViewSet, basename='lk_task')

urlpatterns = router.urls