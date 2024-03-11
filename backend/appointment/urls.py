from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetViewSet, ServiceViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r'pets', PetViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]