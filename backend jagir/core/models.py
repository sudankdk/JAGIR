import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser




# Custom User Model
class MyUser(AbstractUser):
    ROLES = [
        ('JS', 'Job Seeker'),
        ('JG', 'Job Giver'),
    ]
    username = models.CharField(unique=True, primary_key=True, max_length=50)
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLES)

    def __str__(self):
        return self.username


# Job Model
class Job(models.Model):
    class Status(models.TextChoices):
        OPEN = "open", "Open"
        CLOSED = "closed", "Closed"

    job_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="jobs_posted")
    job_name = models.CharField(max_length=100)
    location=models.CharField(max_length=90)
    description = models.TextField()
    skills=models.TextField(blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.OPEN)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.job_name} by {self.user.username}"


# Job Application Model
class JobApplication(models.Model):
    APPLICATION_STATUS = [
        ('PENDING', 'Pending'),
        ('REJECTED', 'Rejected'),
        ('ACCEPTED', 'Accepted'),
    ]

    application_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    applicant = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="applications")
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    cv = models.FileField(upload_to="CV/", blank=False, null=False)
    applied_at = models.DateTimeField(auto_now_add=True)
    application_status = models.CharField(
        max_length=10, choices=APPLICATION_STATUS, default='PENDING'
    )

    class Meta:
        unique_together = ('applicant', 'job') 

    def __str__(self):
        return f"{self.applicant.username} applied to {self.job.job_name}"


# Notification Model
class Notification(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username}: {self.message[:50]}..."

#saved job 
class SavedJob(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="saved_jobs")
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="saved_by_users")
    saved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} saved {self.job.job_name}"

#Company
class Company(models.Model):
    company_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, related_name="company_profile")
    name = models.CharField(max_length=100)
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name

