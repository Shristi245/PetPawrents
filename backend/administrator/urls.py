from django.urls import path
from .views import UserListView, TotalUsersView, AppointmentListView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/total/', TotalUsersView.as_view(), name='total_users'),
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'), 


]