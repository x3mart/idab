from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'lk/slack', LkSlackiewSet, basename='lk_slack')

urlpatterns = router.urls