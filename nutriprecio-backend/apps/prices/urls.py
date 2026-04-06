from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('', views.PriceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('product/<slug:slug>/', views.ProductPriceHistory.as_view(), name='product-price-history'),
    path('compare/', views.ComparePrices.as_view(), name='compare-prices'),
]
