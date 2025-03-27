from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import MyUser,Job,JobApplication,SavedJob

class MyUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=MyUser
        fields = ['username','email','bio','role','profile_image','date_joined','skills','x','github','portfolio','title','location' ] #skills , achivements, contact indfos



class RegisterUserSerializer(serializers.ModelSerializer):
        password=serializers.CharField(write_only=True)
        class Meta:
            model=MyUser
            fields=['username','email','role','password']
        
        def create(self,validated_data):
            
            user= MyUser(
                username=validated_data['username'],
                email=validated_data['email'],
                role=validated_data['role']
                
            )
            user.set_password(validated_data['password'])
            
            user.save()
            return user


class UserLoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=MyUser
        fields=['password','username']
        
    def validate(self,data):
        username=data.get('username')
        password=data.get('password')
        
        if not username or not password:
            raise serializers.ValidationError("username and password are required")
        
        user=authenticate(username=username,password=password)
        
        if user is None:
            raise serializers.ValidationError("Invalid credentails")
        
        data['user']=user
        return data
    
class JobSerializer(serializers.ModelSerializer):
    user=MyUserSerializer(read_only=True)
    class Meta:
        model=Job
        fields=['job_id','user','job_name','location','description','salary','created_at','status','skills']
        read_only_fields=['job_id','user','created_at']
        
        
class JobApplicantSerializer(serializers.ModelSerializer):
    applicant=MyUserSerializer(read_only=True)
    job=JobSerializer(read_only=True)
    class Meta:
        model=Job
        fields=['job','application_id','applicant','cv','applied_at','application_status']
        read_only_fields=['application_id','applicant','applied_at','application_status']
        
        
class JobApplySerializer(serializers.ModelSerializer):
    applicant=MyUserSerializer(read_only=True)
    job=JobSerializer(read_only=True)
    cv = serializers.FileField()
    # job_id=serializers.CharField(write_only=True)

    class Meta:
        model=JobApplication
        fields=['applicant','job','cv']
        read_only_fields=['applicant','job']
        
    # def create(self,validated_data):
    #         cv=validated_data['cv']
    #         job_id = self.context['request'].data.get('id')
    #         # job_id=self.context['view'].kwargs.get('id')
    #         # job_id=self.context['request'].data.get('id')
    #         # job_id = self.context['request'].kwargs.get('id')  
    #         try:
    #             job = Job.objects.get(job_id=job_id)  
    #         except Job.DoesNotExist:
    #             raise serializers.ValidationError({"job_id": "Job not found"})
    #         applicant=self.context['request'].user
    #         application=JobApplication.objects.create(job=job,applicant=applicant,cv=cv)
    #         return application
            
class JobApplicantSerializer(serializers.ModelSerializer):
    applicant=MyUserSerializer(read_only=True)
    job=JobSerializer(read_only=True)
    
    class Meta:
        model=JobApplication
        fields=['job','application_id','applicant','cv','applied_at','application_status']
        read_only_fields=['application_id','applicant','applied_at','application_status']
        
        
class SavedJobSerializer(serializers.ModelSerializer):
    user=MyUserSerializer(read_only=True)
    job=JobSerializer(read_only=True)
    class Meta:
        model=SavedJob
        fields=['user','job','saved_at']
        read_only_fields=['user']
        
# from .models import Notification

# class NotificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Notification
#         fields = ['id', 'message', 'created_at', 'read']