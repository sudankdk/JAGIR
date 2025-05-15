from django.db import models

class CVDocument(models.Model):
    title= models.CharField(max_length=200)
    file = models.FileField(upload_to='cvs/')
    uploaded_at =  models.DateTimeField(auto_now_add=True)
    score = models.FloatField(null=True, blank=True)
    
    def __str__(self):
        return self.title
