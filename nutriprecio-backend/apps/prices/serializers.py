from rest_framework import serializers
from .models import Price


class PriceSerializer(serializers.ModelSerializer):
    store_name = serializers.CharField(source='store.name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Price
        fields = ['id', 'product', 'product_name', 'store', 'store_name', 'price', 'original_price', 'discount_percentage', 'url', 'in_stock', 'recorded_at']
