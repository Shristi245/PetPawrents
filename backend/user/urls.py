
from django.urls import path
from user.views import MyObtainTokenPairView, RegisterView, testEndPoint, getRoutes
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('token/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', testEndPoint, name='test'),
    path('', getRoutes),
]