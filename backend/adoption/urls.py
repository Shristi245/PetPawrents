from django.urls import path, include
from . import views
from .views import UserAdoptedPetsAPIView

urlpatterns = [
    path('adoptiondetails/', views.ApiOverview, name='adoption'),
    path('add/adoptiondetails/', views.add_details, name='add-details'),
    path('all/adoptiondetails/', views.view_details, name='view_details'),
    path('adoption/update/<int:pk>/', views.update_details, name='update-details'),
    path('adoption/<int:pk>/delete/', views.delete_details, name='delete-details'),
    path('user-adopted-pets/', UserAdoptedPetsAPIView.as_view(), name='user-adopted-pets-list'),
    path('adoption/<int:pk>/', views.get_adoption_by_id, name='get-product-by-id'),
    path('adoption/user/<int:userID>/', views.get_adoption_by_user_id, name='get-product-by-id'),
    path('adoption-history/all/', views.get_all_adpotion_history, name='get-product-by-id'),
    path('adoption-history/update-status/<int:adoptionHistoryID>/', views.update_adoption_history_status, name='get-product-by-id'),
]