from django.urls import path, include
from . import views
urlpatterns = [
    path('adoptiondetails/', views.ApiOverview, name='adoption'),
    path('add/adoptiondetails/', views.add_details, name='add-details'),
    path('all/adoptiondetails/', views.view_details, name='view_details'),
    path('adoption/update/<int:pk>/', views.update_details, name='update-details'),
    path('adoption/<int:pk>/delete/', views.delete_details, name='delete-details'),


]
