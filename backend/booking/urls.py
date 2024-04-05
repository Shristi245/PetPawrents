from django.urls import path
from .views import booking_list, booking_detail,  update_booking_status


urlpatterns = [
    path('booking/', booking_list),
    path('booking/<int:user_id>/', booking_detail), 
    path('bookingstatus/<int:booking_id>/', update_booking_status, name='update_appointment_status'),

]
