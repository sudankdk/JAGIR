from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, permissions

from rest_framework.views import APIView
from rest_framework import status


from .permissions import IsJobGiver, IsJobSeeker

from .models import MyUser,Job,Application
from .serializer import MyUserSerializer,RegisterUserSerializer,JobViewSerializer,JobCreateSerializer,ApplicationSerializer


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

@api_view(['POST'])
def register(request):
    serializer=RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
    
    




class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        try:
            response= super().post(request,*args,**kwargs)
            tokens= response.data
            
            access_token= tokens["access"]
            refresh_token= tokens["refresh"]
            
            res = Response()
            
            res.data={"success":True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except:
            return Response({"success":False})

class CustomRefreshToekn(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token=request.COOKIES.get('refresh_token')
            request.data['refresh']=refresh_token
            
            response=super().post(request,*args,**kwargs)
            tokens=response.data
            
            access_token= tokens['access']
            res=Response()
            res.data={"Refreshed":True} 
            res.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    secure=True,
                    samesite="None",
                    path='/'
                ) 
            return res
        except:
            return Response({"Refreshed":False})
        
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request, pk):
    try:
        try:
            user = MyUser.objects.get(username=pk)
        except:
            return Response({'error': 'user does not exist'}, status=404)
        
        serializer = MyUserSerializer(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': "error getting user data", 'details': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_jobs(request):
    try:
       
        jobs = Job.objects.all()  
        serializer = JobViewSerializer(jobs, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': f"Error getting jobs: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsJobGiver])
def create_jobs(request):
    try:
        serializer = JobCreateSerializer(data=request.data) 
        
        if serializer.is_valid():  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
    except Exception as e:
        return Response({'error': f"Error in creating job: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_applications(request):
    user = request.user

    # Job Seeker: Only see applications they submitted
    if user.role == 'JobSeeker':
        applications = Application.objects.filter(user=user)

    # Job Giver: Only see applications for jobs they posted
    elif user.role == 'JobGiver':
        applications = Application.objects.filter(job__posted_by=user)

    # Other roles or no access
    else:
        return Response({'error': 'You do not have permission to view applications.'}, status=status.HTTP_403_FORBIDDEN)

    # Serialize and return the filtered applications
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsJobSeeker])
def create_application(request):
    # Create a new application
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response('authenticated')
    

