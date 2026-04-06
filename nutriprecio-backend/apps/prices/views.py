from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Max, Min
from .models import Price
from .serializers import PriceSerializer


class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = []


class ProductPriceHistory(generics.ListAPIView):
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_slug = self.kwargs.get('slug')
        return Price.objects.filter(product__slug=product_slug).order_by('-recorded_at')


class ComparePrices(generics.ListAPIView):
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_slug = self.request.query_params.get('product')
        if not product_slug:
            return Price.objects.none()
        return Price.objects.filter(product__slug=product_slug).order_by('price')
