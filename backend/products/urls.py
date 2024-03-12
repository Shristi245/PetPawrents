from django.urls import path, include
from . import views
urlpatterns = [
    path('products/', views.ApiOverview, name='home'),
    path('create/products/', views.add_items, name='add-items'),
    path('all/products/', views.view_items, name='view_items'),
    path('products/update/<int:pk>/', views.update_items, name='update-items'),
    path('product/<int:pk>/delete/', views.delete_items, name='delete-items'),


]

