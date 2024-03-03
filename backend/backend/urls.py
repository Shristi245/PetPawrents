# project/urls.py
from django.contrib import admin
from django.urls import path, include
# from reviews.views import ProductViewSet, ImageViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
# router.register(r'product', ProductViewSet, basename='Product')
# router.register(r'image', ImageViewSet, basename='Image')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user.urls')),
    path('', include(router.urls)),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path("ckeditor5/", include('django_ckeditor_5.urls')),

]


urlpatterns +=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)