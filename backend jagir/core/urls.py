from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import CustomLogin,register,create_job,get_job,delete_job

urlpatterns = [
    path('login/',CustomLogin.as_view(),name="Login"),
    path('register/',register,name="Register"),
    path('job/create/',create_job,name="Create_job"),
    path('job/',get_job,name="get_job"),
    path('job/delete/<str:id>/',delete_job,name="delete_job"),
    
    
  
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
