from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Booking
from .serializers import BookingSerializer
from .serializers import GETBookingSerializer





@api_view(['GET', 'POST'])
def booking_list(request):
    if request.method == 'GET':
        bookings = Booking.objects.all()
        serializer = GETBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def booking_detail(request, user_id):
    try:
        booking = Booking.objects.filter(user_id=user_id)  # Retrieve booking using user_id
    except Booking.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['PUT'])
def update_booking_status(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get('status')


    if new_status not in ['accepted', 'rejected']:
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

    booking.status = new_status
    booking.save()
    serializer = BookingSerializer(booking)
    return Response(serializer.data)
