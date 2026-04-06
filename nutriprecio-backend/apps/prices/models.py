from django.db import models
from apps.stores.models import Store
from apps.products.models import Product


class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='prices')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='prices')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    url = models.URLField(blank=True)
    in_stock = models.BooleanField(default=True)
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at']
        indexes = [
            models.Index(fields=['product', 'store', '-recorded_at']),
            models.Index(fields=['recorded_at']),
        ]
        unique_together = ['product', 'store', 'recorded_at']

    def __str__(self):
        return f"{self.product.name} at {self.store.name}: ${self.price}"
