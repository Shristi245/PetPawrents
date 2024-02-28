
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from user.models import AppUser
from .serializers import UserSerializer, RegisterSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer
# from user.utils import generate_otp, send_otp_phone
import logging

logger = logging.getLogger(__name__)



class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


# class RegisterView(APIView):
#     serializer_class = RegisterSerializer

#     def post(self, request):
#         try:
#             data = request.data
#             serializer = RegisterSerializer(data=data)
#             if serializer.is_valid():
#                 serializer.save()
#                 phone_number = serializer.data['phone_number']
#                 otp_value = serializer.data['otp']
#                 send_otp_phone(phone_number=phone_number, otp=otp_value)
#                 return Response({"message": "User created successfully. OTP sent to your phone number."}, status=status.HTTP_201_CREATED)
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
#         except Exception as e:
#             print(e)
#             return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class RegisterView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Profileview
class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer





# Get All Routes
@api_view(['GET'])
def getRoutes(request):
    """
    Get the list of available routes.
    Parameters:
    - request: The HTTP request object.
    Returns:
    - Response object containing a list of routes.
    """
    routes = [
    
        '/user/token/',
        '/user/register/',
        '/user/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)