from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'lk/study_materials', LkStudyMaterialViewSet, basename='lk_study_material')

urlpatterns = router.urls