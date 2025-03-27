from celery import shared_task
from django.core.mail import send_mail
from .env import mail

@shared_task
def send_resume_accept_email(email):
    subject = "Your Resume Has Been Accepted!"
    message = "Congratulations! A job giver has accepted your resume. Log in to check the details."
    send_mail(subject, message, mail, [email])
