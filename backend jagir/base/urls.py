
from django.contrib import admin
from django.urls import path,include
from debug_toolbar.toolbar import debug_toolbar_urls
from base import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]+ debug_toolbar_urls()


