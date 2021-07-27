from django.urls import path
from .views import ContactViewSet, CategoryViewSet, ProgramViewSet, ManagmentViewSet, LeaderViewSet, TeacherViewSet, EventViewSet, ReviewViewSet, ReviewVideoViewSet, FaqViewSet, SectionViewSet, GalleryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'programs', ProgramViewSet, basename='program')
router.register(r'managments', ManagmentViewSet, basename='managment')
router.register(r'leader', LeaderViewSet, basename='leader')
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'events', EventViewSet, basename='event')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'reviewsvideos', ReviewVideoViewSet, basename='reviewvideo')
router.register(r'faqs', FaqViewSet, basename='faq')
router.register(r'pages', SectionViewSet, basename='page')
router.register(r'galleries', GalleryViewSet, basename='gallery')

urlpatterns = router.urls