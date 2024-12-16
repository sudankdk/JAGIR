from django.db import models
from django.contrib.auth.models import AbstractUser


class MyUser(AbstractUser):
    ROLE_CHOICES = [
        ('employer', 'Employer'),
        ('job_seeker', 'Job Seeker')
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)
    bio = models.CharField(max_length=500, blank=True, null=True)
    followers = models.ManyToManyField("self", symmetrical=False, related_name='following', blank=True)
    username=models.CharField(max_length=69,unique=True,primary_key=True)

    def __str__(self):
        return self.username


class JobCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Location(models.Model):
    PROVINCES = [
        ('1', 'Province 1'),
        ('2', 'Province 2'),
        ('3', 'Province 3'),
        ('4', 'Province 4'),
        ('5', 'Province 5'),
        ('6', 'Province 6'),
        ('7', 'Province 7'),
    ]
    province = models.CharField(max_length=2, choices=PROVINCES, default='1')

    def __str__(self):
        return f"Province {self.province}"


class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('full_time', 'Full-time'),
        ('part_time', 'Part-time'),
        ('internship', 'Internship'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    skills_required = models.TextField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES)
    posted_by = models.ForeignKey(MyUser, related_name='jobs', on_delete=models.CASCADE)
    category = models.ForeignKey(JobCategory, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=50, default='open')  # Open, Closed, Filled, etc.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Application(models.Model):
    APPLICATION_STATUS = [
        ('applied', 'Applied'),
        ('interviewing', 'Interviewing'),
        ('hired', 'Hired'),
        ('rejected', 'Rejected'),
    ]
    job = models.ForeignKey(Job, related_name='applications', on_delete=models.CASCADE)
    user = models.ForeignKey(MyUser, related_name='applications', on_delete=models.CASCADE)
    cover_letter = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to='resumes/')
    status = models.CharField(max_length=50, choices=APPLICATION_STATUS, default='applied')
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} applied for {self.job.title}'
