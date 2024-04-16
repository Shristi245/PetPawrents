from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Transaction
from booking.models import Booking
from .serializers import TransactionSerializer
from django.shortcuts import render, get_object_or_404


@api_view(['POST'])
def create_transaction(request):
    if request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update_transaction_amount(request):
    if request.method == 'PATCH':
        try:
            amount = request.data.get('amount')
            reference_id = request.data.get('reference_id')
            transaction_type = request.data.get('transaction_type')

            transaction = Transaction.objects.get(reference_id=reference_id, transaction_type=transaction_type)
            booking = Booking.objects.get(id=reference_id)
            
            if amount is not None:
                transaction.amount = amount
                booking.estimated_price = amount
                transaction.save()
                booking.save()
                serializer = TransactionSerializer(instance=transaction)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Amount not provided in request'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['GET'])
def get_all_transactions(request):
    if request.method == 'GET':
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)