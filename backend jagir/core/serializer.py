from rest_framework import serializers
from .models import *

class MyUserSerializer(serializers.ModelSerializer):
    followers_count=serializers.SerializerMethodField()
    following_count=serializers.SerializerMethodField()
    
    class Meta:
        model=MyUser
        fields = [ 'username', 'email', 'role', 'profile_image', 'bio', 'followers_count', 'following_count']


    def get_following_count(self,obj):
        return obj.following.count()
    
    def get_followers_count(self,obj):
        return obj.followers.count()



class RegisterUserSerializer(serializers.ModelSerializer):
        password=serializers.CharField(write_only=True)
        class Meta:
            model=MyUser
            fields=['username','email','role','first_name','last_name','password']
        
        def create(self,validated_data):
            
            user= MyUser(
                username=validated_data['username'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                role=validated_data['role']
                
            )
            user.set_password(validated_data['password'])
            user.save()
            return user

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['provience']
   
   
class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['name','description']
        
        
class JobViewSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    posted_by = MyUserSerializer() 
    category=JobCategorySerializer()
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model=Job
        fields=['title','description','skills_required','location','job_type','posted_by','category','status','created_at']

class JobCreateSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    posted_by = MyUserSerializer()  
    category = JobCategorySerializer()
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Job
        fields = ['title', 'description', 'skills_required', 'location', 'job_type', 'posted_by', 'category', 'status', 'created_at']

    def create(self, validated_data):
     
        location_data = validated_data.pop('location')
        location = Location.objects.create(**location_data)

       
        category_data = validated_data.pop('category')
        category = JobCategory.objects.create(**category_data)

   
        posted_by_data = validated_data.pop('posted_by')
        
        posted_by, created = MyUser.objects.get_or_create(
            username=posted_by_data['username'],
            defaults={**posted_by_data}  
        )

       
        job = Job.objects.create(
            location=location,
            category=category,
            posted_by=posted_by,
            **validated_data  
        )

        return job


class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Application
        fields = [
             'job', 'job_title', 'user', 'user_username',
            'cover_letter', 'resume', 'status', 'applied_at'
        ]
        
        read_only_fields = ['applied_at']
        
        