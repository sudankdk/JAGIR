from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import CustomLogin,register,create_job,get_job,delete_job,apply_job,get_applicant,shortlist_applicant,reject_applicant,close_job,open_cv,search_usernames,search_job_by_location,search_job_by_jobname,SavedJobs,Search_by_location_name


urlpatterns = [
    #auth
    path('login/',CustomLogin.as_view(),name="Login"),
    path('register/',register,name="Register"),
    
    #job
    path('job/create/',create_job,name="Create_job"),
    path('job/',get_job,name="get_job"),
    path('job/delete/<str:id>/',delete_job,name="delete_job"),
    path('job/close/<str:id>/',close_job,name="close_job"),
    
    
    #applicant
    path('job/apply/<str:id>/',apply_job,name="apply_job"),
    path('job/applicant/',get_applicant,name="get_applicant"),
    path('job/applicant/shortlist/<str:id>/',shortlist_applicant,name="shortlist_applicant"),
    path('job/applicant/reject/<str:id>/',reject_applicant,name="reject_applicant"),
    path('job/applicant/cv/<str:id>/',open_cv,name="cv"),
    
    #search
    path('search/users/<str:username>/',search_usernames,name="username-serach-usernames"),
    path('search/job/location/<str:location>/',search_job_by_location,name="search-job-location"),
    path('search/job/<str:jobname>/',search_job_by_jobname,name="search-job-jobname"),
    path('search/job/<str:jobname>/<str:location>/',Search_by_location_name,name="search-location-name"),
    
    
    #saved jobs
    path('saved/jobs/',SavedJobs.as_view(),name="saved jobs"),
    path('saved/jobs/<str:job_id>/',SavedJobs.as_view(),name="saved jobs")
    
    
    
  
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
