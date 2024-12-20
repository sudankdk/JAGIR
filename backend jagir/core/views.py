from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .models import Job,JobApplication
from .serializer import UserLoginSerializer,RegisterUserSerializer,JobSerializer,JobApplySerializer,JobApplicantSerializer

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



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_job(request, id):
    try:
        applicant_role = request.user.role
        if applicant_role != "JS":
            return Response({"error": "Not a valid user "}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            job = Job.objects.get(job_id=id)
            # print(job)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
        if job.status == "closed":
            return Response({"error": "Job is closed"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = JobApplySerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(applicant=request.user, job=job)
            print(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response({"error": "An error occurred while applying for the job: " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_applicant(request):
        try:
            user_role=request.user.role
            if user_role=="JG":
                applicant=JobApplication.objects.all()
                serializer=JobApplicantSerializer(applicant,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response({"error":"Only Job Giver can see applicant"},status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"error":"Error in getting jobs"},status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shortlist_applicant(request,id):
    try:
        user_role=request.user.role
        if user_role=="JG":
            applicant=JobApplication.objects.get(application_id=id)
            applicant.application_status="ACCEPTED"
            applicant.save()
            return Response({"message":"Applicant shortlisted"},status=status.HTTP_200_OK)
    except:
        return Response({"error":"Error in shortlisting applicant"},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_applicant(request,id):
    try:
        user_role=request.user.role
        if user_role=="JG":
            applicant=JobApplication.objects.get(application_id=id)
            applicant.application_status="REJECTED"
            applicant.save()
            return Response({"message":"Applicant rejected"},status=status.HTTP_200_OK)
    except:
        return Response({"error":"Error in rejecting applicant"},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def close_job(request,id):
    try:
        user_role=request.user.role
        if user_role=="JG":
            job=Job.objects.get(job_id=id)
            job.status="closed"
            job.save()
            return Response({"message":"Job Closed"},status=status.HTTP_200_OK)
    except:
        return Response({"error":"Error in closing job"},status=status.HTTP_400_BAD_REQUEST)