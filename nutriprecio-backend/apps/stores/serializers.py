from rest_framework import serializers
from .models import Store


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'slug', 'logo', 'website', 'is_active', 'owner', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'is_active', 'owner', 'created_at', 'updated_at']
