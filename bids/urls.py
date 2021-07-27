from django.urls import path
# from rest_framework.routers import DefaultRouter
from .views import EventBidView, ProgramBidView, PlanBidView, EducationBidView

# router = DefaultRouter()
# router.register(r'eventbids', EventBidView, basename='eventbid')

urlpatterns = [
    path("eventbids/", EventBidView.as_view()),
    path("programbids/", ProgramBidView.as_view()),
    path("planbids/", PlanBidView.as_view()),
    path("educationbids/", EducationBidView.as_view()),
]