from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_resume_accept_email(email):
    subject = "Your Resume Has Been Accepted!"
    message = "Congratulations! A job giver has accepted your resume. Log in to check the details."
    
    sender_email = settings.EMAIL_HOST_USER 

    send_mail(subject, message, sender_email, [email])
    
    
@shared_task
def send_resume_reject_email(email):
    subject = "Your Resume Has Been Rejected!"
    message = "Dont be dissapointed you can always work hard and try again."
    
    sender_email = settings.EMAIL_HOST_USER 

    send_mail(subject, message, sender_email, [email])
