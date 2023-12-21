
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from user.models import AppUser
from .serializers import UserSerializer, RegisterSerializer
from rest_framework import generics

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer






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