from django.urls import path
from .views import upload_cv, get_cv_score
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('upload-cv/', upload_cv, name='upload_cv'),
    path('cv/<int:cv_id>/', get_cv_score, name='get_cv_score'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
