# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AggregatedDataSerializer
from user.models import User
from adoption.models import Adopt
from booking.models import Booking
from products.models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AggregatedDataView(APIView):
    def get(self, request):
        users_count = User.objects.count()  
        products_count = Product.objects.count()
        adoption_count = Adopt.objects.count()
        booking_count = Booking.objects.count()
        # Calculate counts for other tables as needed

        data = {
            'users_count': users_count,
            'products_count': products_count,
            'adoption_count': adoption_count,
            'booking_count': booking_count
            # Add more fields as needed for other tables
        }

        serializer = AggregatedDataSerializer(data)
        return Response(serializer.data)
    


class BookingStatusAnalytics(APIView):
    def get(self, request):
        try:
            total_bookings = Booking.objects.count()
            pending_count = Booking.objects.filter(status='pending').count()
            accepted_count = Booking.objects.filter(status='accepted').count()
            cancelled_count = Booking.objects.filter(status='cancelled').count()
            
            # Calculate percentages
            if total_bookings > 0:
                pending_percentage = (pending_count / total_bookings) * 100
                accepted_percentage = (accepted_count / total_bookings) * 100
                cancelled_percentage = (cancelled_count / total_bookings) * 100
            else:
                pending_percentage = 0
                accepted_percentage = 0
                cancelled_percentage = 0
            
            analytics_data = {
                'total_bookings': total_bookings,
                'pending_count': pending_count,
                'accepted_count': accepted_count,
                'cancelled_count': cancelled_count,
                'pending_percentage': round(pending_percentage, 2),
                'accepted_percentage': round(accepted_percentage, 2),
                'cancelled_percentage': round(cancelled_percentage, 2)
            }
            
            return Response(analytics_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
