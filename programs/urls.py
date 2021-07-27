from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'lk/categories', LkCategoryViewSet, basename='lk_category')
router.register(r'lk/programs', LkProgramViewSet, basename='lk_program')
router.register(r'lk/training_group_basics', LkTrainingGroupBasicViewSet, basename='lk_training_group_basic')
router.register(r'lk/training_groups', LkTrainingGroupViewSet, basename='lk_training_group')

urlpatterns = router.urls