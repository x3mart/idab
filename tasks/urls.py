from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'lk/tasks', LkTaskViewSet, basename='lk_task')
router.register(r'lk/solutions', LkSolutionViewSet, basename='lk_solution')

urlpatterns = router.urls