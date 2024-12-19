from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .models import Job
from .serializer import UserLoginSerializer,RegisterUserSerializer,JobSerializer,MyUserSerializer

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


class CustomLogin(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        
        #suru ma maila usercredntial lai parse garnnu paro
        username=request.data.get('username')
        password=request.data.get('password')
        
        if not username or not password :
           raise AuthenticationFailed("username and password are required")
       
        #aba user lai authenticate garnu parxa
        user=authenticate(username=username,password=password)
        
        if user is None:
            raise AuthenticationFailed("Invalid Credentials")
        
        #yedi authenticate hunxa vane , jwt generate garnu paro
        serializer=UserLoginSerializer(user)
        response=super().post(request,*args,**kwargs)
        
        tokens=response.data
        access_tokens=tokens['access']
        refresh_tokens=tokens['refresh']
        
        return Response({
            'success': True,
            'access_token': access_tokens,
            'refresh_token': refresh_tokens,
            'username': user.username,  
        }, status=status.HTTP_200_OK)

    
@api_view(['POST'])
def register(request):
    serializer=RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response({"error":"Not Valid Regsiter"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_job(request):
    try:
        user_role=request.user.role
        if user_role == "JG":
            serializer = JobSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # If user is not allowed to post a job
        return Response(
            {"error": "Only Job Givers can create jobs."}, 
            status=status.HTTP_403_FORBIDDEN
        )
        
    except AttributeError:
        return Response(
            {"error": "User role not found."}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_job(request):
    try:
        jobs= Job.objects.all()
        serializer= JobSerializer(jobs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except:
        return Response({"error":"Error in getting jobs"},status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['Delete'])
@permission_classes([IsAuthenticated])
def delete_job(request,id):
    try:
        job=Job.objects.get(job_id=id)
        
        if job.user != request.user:
            return Response({"error": "You are not authorized to delete this record."}, status=status.HTTP_403_FORBIDDEN)
        
        job.delete()
        
        return Response({"message": "Job record deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        
    except:
        return Response({"error":"Error in deleting jobs"},status=status.HTTP_400_BAD_REQUEST)
