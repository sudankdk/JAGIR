from django.contrib import admin
from .models import MyUser,JobApplication,Job
# Register your models here.
admin.site.register(MyUser)
admin.site.register(JobApplication)
admin.site.register(Job)
