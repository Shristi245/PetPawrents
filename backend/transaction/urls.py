from django.urls import path
from . import views

urlpatterns = [
    path('transactions/create/', views.create_transaction, name='transactions'),
    path('transactions/all/', views.get_all_transactions, name='transactions'),
    path('transactions/update-amount/', views.update_transaction_amount, name='transactions'),
]
