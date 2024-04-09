from django.urls import path
from . import views

urlpatterns = [
    path('reviews/', views.list_reviews, name='list_reviews'),
    path('reviews/<int:pk>/', views.retrieve_review, name='retrieve_review'),
    path('reviews/create/', views.create_review, name='create_review'),
    path('reviews/update/<int:pk>/', views.update_review, name='update_review'),
    path('reviews/delete/<int:pk>/', views.delete_review, name='delete_review'),
]
