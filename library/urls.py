from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'lk/library', LkLibraryViewSet, basename='lk_library')


urlpatterns = router.urls