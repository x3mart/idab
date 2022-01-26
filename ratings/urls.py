from django.urls import path

from .views import RatingView, ExportRatingXls

urlpatterns = [
    path('ratings/', RatingView.as_view(), name='ratings'),
    path('ratings/export/', ExportRatingXls.as_view(), name='ratingsexport'),
]