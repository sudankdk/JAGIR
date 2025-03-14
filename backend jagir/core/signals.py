# from django.db.models.signals import post_save,post_delete
# from django.dispatch import receiver
# from core.models import Job
# from django.core.cache import cache

# @receiver([post_save,post_delete],sender=Job)
# def invalidate_job_cache(sender,instace,**kwargs):
#     cache.delete_pattern('*jobs_cache_key*')

# jobs/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Job  # Assuming you have a Job model

# Cache key for the jobs
CACHE_KEY = 'jobs_cache_key'

# Signal to update or clear the cache after a Job instance is saved
@receiver(post_save, sender=Job)
def update_job_cache(sender, instance, created, **kwargs):
    cache.delete(CACHE_KEY)  # Delete the cache for the jobs
    cache.set(CACHE_KEY, 'Some sample data', timeout=900)  # Set updated cache
    print(f"Cache updated for Job instance . Cache invalidated.")

# Signal to clear the cache after a Job instance is deleted
@receiver(post_delete, sender=Job)
def delete_job_cache(sender, instance, **kwargs):
    # Delete the cache when a Job instance is deleted
    cache.delete(CACHE_KEY)
    print(f"Cache invalidated for deleted Job instance,{instance} .")
