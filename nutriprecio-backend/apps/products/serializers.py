from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    latest_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'brand', 'category', 'category_name', 'unit', 'image', 'description', 'barcode', 'latest_price', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def get_latest_price(self, obj):
        from apps.prices.models import Price
        latest = Price.objects.filter(product=obj).order_by('-recorded_at').first()
        if latest:
            return {
                'price': latest.price,
                'original_price': latest.original_price,
                'discount_percentage': latest.discount_percentage,
                'store': latest.store.name,
                'in_stock': latest.in_stock,
            }
        return None
