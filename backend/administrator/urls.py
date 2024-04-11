from django.urls import path
from .views import UserDetailView, UserListView, TotalUsersView, UserDeleteView, TotalAppointmentsView, TotalProductsView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # Add this line
    path('users/total/', TotalUsersView.as_view(), name='total_users'),
    path('appointments/total/', TotalAppointmentsView.as_view(), name='total_appointments'),
    path('products/total/', TotalProductsView.as_view(), name='total_products'),
    # path('adoptiondetails/total/', TotalPetsforAdoptionsView.as_view(), name='total_petforadoptions'),
    # path('adopted-pets/', AdoptedPetListAPIView.as_view(), name='adopted-pets-list'),

]