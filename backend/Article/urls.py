# # urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
# router.register(r'userarticle', ArticleUserviewset, basename='article')
router.register(r'allarticle', Articleviewset, basename='allarticle')
urlpatterns = [
    # JWT token URLs
    path('', include(router.urls)),
    path('categories/', CategoryChoicesAPIView.as_view(), name='category-choices'),
    
]
