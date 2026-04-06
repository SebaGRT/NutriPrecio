from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductListCreate.as_view(), name='product-list'),
    path('<slug:slug>/', views.ProductDetail.as_view(), name='product-detail'),
    path('search/', views.ProductSearch.as_view(), name='product-search'),
]
