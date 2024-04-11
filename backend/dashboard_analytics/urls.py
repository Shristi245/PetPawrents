from django.urls import path
from . import views

urlpatterns = [
    path('count-analytics/', views.AggregatedDataView.as_view(), name='product-analytics'),
    path('booking-status-analytics/', views.BookingStatusAnalytics.as_view(), name='booking-status-analytics'),

]
