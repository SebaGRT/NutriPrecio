# NutriPrecio - Quick Start Guide

## TL;DR

### Start Backend
```bash
cd nutriprecio-backend
source venv/bin/activate
USE_SQLITE=True python manage.py runserver
```

### Start Frontend
```bash
cd nutriprecio-frontend
npm start
```

Access frontend at http://localhost:4200
API at http://localhost:8000/api/

---

## API Quick Test

```bash
# Login (get token)
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "youruser", "password": "yourpass"}'

# List products
curl http://localhost:8000/api/products/

# List stores
curl http://localhost:8000/api/stores/

# List categories
curl http://localhost:8000/api/categories/
```

---

## Create Test Data

```bash
cd nutriprecio-backend
source venv/bin/activate
USE_SQLITE=True python manage.py shell

# Create store
from apps.stores.models import Store
Store.objects.create(name="Jumbo", slug="jumbo", website="https://jumbo.cl")

# Create category
from apps.categories.models import Category
Category.objects.create(name="Frutas", slug="frutas")

# Create product
from apps.products.models import Product
Product.objects.create(name="Manzana Roja", slug="manzana-roja", brand="Local", unit="kg", category_id=1)

# Create price
from apps.prices.models import Price
from apps.stores.models import Store
from apps.products.models import Product
from django.contrib.auth.models import User

store = Store.objects.first()
product = Product.objects.first()
Price.objects.create(product=product, store=store, price=2500)
```

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Module not found" | Run `pip install -r requirements.txt` |
| "Database error" | Run `USE_SQLITE=True python manage.py migrate` |
| CORS error | Ensure `DEBUG=True` in settings |
| Angular build fails | Delete `node_modules` and run `npm install` again |
| Port in use | Use `--port 4201` or kill process on port |

---

## File Locations

- **Backend settings**: `nutriprecio-backend/nutriprecio/settings.py`
- **API URLs**: `nutriprecio-backend/nutriprecio/urls.py`
- **Frontend routing**: `nutriprecio-frontend/src/app/app.routes.ts`
- **API service**: `nutriprecio-frontend/src/app/core/services/api.service.ts`
- **Environment**: `nutriprecio-frontend/src/environments/environment.ts`

---

## Tech Stack

- Backend: Django 6 + DRF + SQLite
- Frontend: Angular 19 + Angular Material
- Auth: Token Authentication
