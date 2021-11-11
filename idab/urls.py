"""idab URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# import debug_toolbar
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .yasg import urlpatterns as url_docs
import debug_toolbar
from django.views.generic import TemplateView
from users.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path to djoser end points
    path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),
    # path to my app's endpoints
    path("api/", include("users.urls")),
    path("api/", include("siteblocks.urls")),
    path("api/", include("bids.urls")),
    path("api/", include("programs.urls")),
    path("api/", include("courses.urls")),
    path("api/", include("tutorials.urls")),
    path("api/", include("schedule.urls")),
    path("api/", include("tasks.urls")),
    path("api/", include("library.urls")),
    path("api/", include("studymaterials.urls")),
    path("api/", include("slack.urls")),
    path("api/", include("attendances.urls")),
    path("api/", include("ratings.urls")),
    # ckeditor
    path('ckeditor/', include('ckeditor_uploader.urls')),
    # Token Access Create/Refresh
    path('auth/jwt/create/', MyTokenObtainPairView.as_view(), name='lk_login'),
    path('auth/jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += path('__debug__/', include(debug_toolbar.urls)),
    # urlpatterns += url_docs
urlpatterns += url_docs
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]