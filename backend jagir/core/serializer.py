from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import MyUser

class MyUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=MyUser
        fields = ['username','bio','role','profile_image' ]



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