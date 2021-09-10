from rest_framework.routers import DefaultRouter
from .views import LkTutorialViewSet

router = DefaultRouter()
router.register(r'lk/tutorials', LkTutorialViewSet, basename='lk_tutorial')

urlpatterns = router.urls