from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import CustomLogin,register

urlpatterns = [
    path('login/',CustomLogin.as_view(),name="Login"),
    path('register/',register,name="Login"),
    
  
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
