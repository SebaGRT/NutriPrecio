from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.users.models import User
from apps.categories.models import Category
from apps.stores.models import Store
from apps.products.models import Product
from apps.prices.models import Price


class Command(BaseCommand):
    help = "Populates the database with minimal seed data for demo purposes."

    def handle(self, *args, **options):
        self._create_users()
        self._create_categories()
        self._create_stores()
        self._create_products()
        self._create_prices()
        self._print_summary()

    def _create_users(self):
        self.stdout.write("Creating users...")
        self.seller, _ = User.objects.get_or_create(
            username="vendedor",
            defaults={
                "email": "vendedor@test.cl",
                "is_seller": True,
            },
        )
        self.seller.set_password("test123")
        self.seller.save()

        self.buyer, _ = User.objects.get_or_create(
            username="comprador",
            defaults={
                "email": "comprador@test.cl",
                "is_seller": False,
            },
        )
        self.buyer.set_password("test123")
        self.buyer.save()

    def _create_categories(self):
        self.stdout.write("Creating categories...")
        category_names = ["Frutas", "Verduras", "Lácteos"]
        self.categories = {}
        for name in category_names:
            cat, _ = Category.objects.get_or_create(
                slug=slugify(name),
                defaults={"name": name},
            )
            self.categories[name] = cat

    def _create_stores(self):
        self.stdout.write("Creating stores...")
        store_data = [
            {"name": "Supermercado Saludable", "slug": "supermercado-saludable"},
            {"name": "Verdulería Don Pepe", "slug": "verduleria-don-pepe"},
            {"name": "Lácteos del Sur", "slug": "lacteos-del-sur"},
        ]
        self.stores = {}
        for data in store_data:
            store, _ = Store.objects.get_or_create(
                slug=data["slug"],
                defaults={"name": data["name"], "owner": self.seller},
            )
            self.stores[data["name"]] = store

    def _create_products(self):
        self.stdout.write("Creating products...")
        product_data = [
            {"name": "Manzana Fuji", "category": "Frutas", "unit": "kg"},
            {"name": "Plátano", "category": "Frutas", "unit": "kg"},
            {"name": "Naranja", "category": "Frutas", "unit": "kg"},
            {"name": "Palta Hass", "category": "Frutas", "unit": "unit"},
            {"name": "Tomate Limachino", "category": "Verduras", "unit": "kg"},
            {"name": "Lechuga Costina", "category": "Verduras", "unit": "unit"},
            {"name": "Cebolla", "category": "Verduras", "unit": "kg"},
            {"name": "Zanahoria", "category": "Verduras", "unit": "kg"},
            {"name": "Leche Entera", "category": "Lácteos", "unit": "L"},
            {"name": "Queso Gauda", "category": "Lácteos", "unit": "kg"},
        ]
        self.products = {}
        for data in product_data:
            product, _ = Product.objects.get_or_create(
                slug=slugify(data["name"]),
                defaults={
                    "name": data["name"],
                    "category": self.categories[data["category"]],
                    "unit": data["unit"],
                    "brand": "",
                },
            )
            self.products[data["name"]] = product

    def _create_prices(self):
        self.stdout.write("Creating prices...")

        price_data = [
            # Supermercado Saludable prices
            {"product": "Manzana Fuji", "store": "Supermercado Saludable", "price": 1890},
            {"product": "Plátano", "store": "Supermercado Saludable", "price": 1290},
            {"product": "Naranja", "store": "Supermercado Saludable", "price": 990},
            {"product": "Palta Hass", "store": "Supermercado Saludable", "price": 1590},
            {"product": "Tomate Limachino", "store": "Supermercado Saludable", "price": 1490},
            {"product": "Leche Entera", "store": "Supermercado Saludable", "price": 1150},
            # Verdulería Don Pepe prices
            {"product": "Manzana Fuji", "store": "Verdulería Don Pepe", "price": 1690},
            {"product": "Plátano", "store": "Verdulería Don Pepe", "price": 1190},
            {"product": "Naranja", "store": "Verdulería Don Pepe", "price": 890},
            {"product": "Tomate Limachino", "store": "Verdulería Don Pepe", "price": 1390},
            {"product": "Lechuga Costina", "store": "Verdulería Don Pepe", "price": 790},
            {"product": "Cebolla", "store": "Verdulería Don Pepe", "price": 690},
            # Lácteos del Sur prices
            {"product": "Leche Entera", "store": "Lácteos del Sur", "price": 1090, "original_price": 1290, "discount_percentage": 15},
            {"product": "Queso Gauda", "store": "Lácteos del Sur", "price": 4990},
            {"product": "Manzana Fuji", "store": "Lácteos del Sur", "price": 1790},
        ]

        for data in price_data:
            Price.objects.get_or_create(
                product=self.products[data["product"]],
                store=self.stores[data["store"]],
                recorded_at__isnull=False,
                defaults={
                    "price": data["price"],
                    "original_price": data.get("original_price"),
                    "discount_percentage": data.get("discount_percentage", 0),
                },
            )

    def _print_summary(self):
        user_count = User.objects.count()
        category_count = Category.objects.count()
        store_count = Store.objects.count()
        product_count = Product.objects.count()
        price_count = Price.objects.count()

        self.stdout.write(self.style.SUCCESS(
            f"\nSeed data created successfully!"
            f"\n  Users:     {user_count}"
            f"\n  Categories: {category_count}"
            f"\n  Stores:    {store_count}"
            f"\n  Products:  {product_count}"
            f"\n  Prices:    {price_count}"
        ))
