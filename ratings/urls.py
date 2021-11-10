from django.urls import path

from .views import RatingView

urlpatterns = [
    path('ratings/', RatingView.as_view(), name='ratings'),
]