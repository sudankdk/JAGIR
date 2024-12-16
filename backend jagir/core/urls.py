from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import get_user_profile,CustomTokenObtainPairView,CustomRefreshToekn,register,get_jobs,create_jobs,list_applications,create_application,authenticated


urlpatterns = [
    #user-profile
    path('user_data/<str:pk>/',get_user_profile),
    
    #register
    path('register/', register, name='register'),
    
    #token auth
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshToekn.as_view(), name='token_refresh'),
    
    
    # Jobs
    path('jobs/', get_jobs, name='get_jobs'),  # List all jobs
    path('jobs/create/', create_jobs, name='create_jobs'),  # Create a job (Job Giver)

    # Applications
    path('applications/', list_applications, name='list_applications'),  # List applications
    path('applications/create/', create_application, name='create_application'),  # Create application (Job Seeker)
    
    #authenticated
     path('authenticated/', authenticated, name='authenticated'), 
 
  
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
