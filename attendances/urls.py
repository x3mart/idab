from django.conf.urls import url
from django.urls import path

from .views import export_attendance_xls

urlpatterns = [
    url(r'^export/xls/$', export_attendance_xls, name='export_users_xls'),
]