from django.db import models
from django.contrib.auth.models import AbstractUser


class MyUSer(AbstractUser):
    Roles=[
        ('JS','JobSeeker'),
        ('JG','JobGIVER'),
    ]
    username=models.CharField(unique=True,primary_key=True,max_length=50)
    bio=models.TextField(max_length=100,blank=True)
    proile_Image=models.ImageField(upload_to='profile_image/',blank=True,null=True)
    role=models.CharField(max_length=10,choices=Roles)
    
    def __str__(self):
        return self.username