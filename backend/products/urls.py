from django.urls import path, include
from . import views
urlpatterns = [
    path('products/', views.ApiOverview, name='home'),
    path('create/products/', views.add_items, name='add-items'),
    path('all/products/', views.view_items, name='view_items'),
    path('products/update/<int:pk>/', views.update_items, name='update-items'),
    path('product/<int:pk>/delete/', views.delete_items, name='delete-items'),
    path('product/<int:pk>/', views.get_product_by_id, name='get-product-by-id'),
    path('place-order/', views.PlaceOrder, name='place_order'), # Place order
    path('all/orders/', views.GetAllOrders, name='GetAllOrders'), # Get all orders for admin
    path('all/orders/user/<int:userID>/', views.GetOrderByUserID, name='GetOrderByUserID'), # Get all orders for user
    path('all/order-items/<int:orderID>/', views.GetOrderItemsByOrderID, name='GetOrderItemsByOrderID'), # Get order items by order id
]