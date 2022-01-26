from django.conf.urls import url
from django.urls import path

from .views import ExportAttendanceXls

urlpatterns = [
    path('export/xls/', ExportAttendanceXls.as_view(), name='export_users_xls'),
]