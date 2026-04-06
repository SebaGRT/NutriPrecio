# API Reference

## Base URL
```
http://localhost:8000/api/
```

---

## Products

### List Products
```
GET /api/products/
```

**Query Parameters**
| Param | Type | Description |
|-------|------|-------------|
| search | string | Search in name, brand, barcode |
| category | int | Filter by category ID |
| brand | string | Filter by brand |
| page | int | Page number |

**Response**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Manzana Roja",
      "slug": "manzana-roja",
      "brand": "Local",
      "category": 1,
      "category_name": "Frutas",
      "unit": "kg",
      "image": "/media/products/image.jpg",
      "description": "",
      "barcode": "",
      "latest_price": {
        "price": "2500.00",
        "original_price": null,
        "discount_percentage": "0.00",
        "store": "Jumbo",
        "in_stock": true
      },
      "created_at": "2026-04-05T12:00:00Z",
      "updated_at": "2026-04-05T12:00:00Z"
    }
  ]
}
```

### Get Product Detail
```
GET /api/products/<slug>/
```

### Search Products
```
GET /api/products/search/?q=<query>
```

---

## Stores

### List Stores
```
GET /api/stores/
```

**Response**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Jumbo",
      "slug": "jumbo",
      "logo": "/media/stores/jumbo.png",
      "website": "https://jumbo.cl",
      "is_active": true,
      "created_at": "2026-04-05T12:00:00Z",
      "updated_at": "2026-04-05T12:00:00Z"
    }
  ]
}
```

### Get Store Detail
```
GET /api/stores/<slug>/
```

---

## Categories

### List Categories
```
GET /api/categories/
```

**Response**
```json
[
  {
    "id": 1,
    "name": "Frutas",
    "slug": "frutas",
    "parent": null,
    "image": "/media/categories/frutas.png",
    "children": [
      {
        "id": 2,
        "name": "Manzanas",
        "slug": "manzana",
        "parent": 1,
        "image": null,
        "children": []
      }
    ]
  }
]
```

---

## Prices

### Compare Prices
```
GET /api/prices/compare/?product=<product-slug>
```

**Response**
```json
[
  {
    "id": 1,
    "product": 1,
    "product_name": "Manzana Roja",
    "store": 1,
    "store_name": "Jumbo",
    "price": "2500.00",
    "original_price": null,
    "discount_percentage": "0.00",
    "url": "https://jumbo.cl/producto",
    "in_stock": true,
    "recorded_at": "2026-04-05T12:00:00Z"
  }
]
```

---

## Authentication

### Login
```
POST /api/users/login/
```

**Request**
```json
{
  "username": "user",
  "password": "password"
}
```

**Response**
```json
{
  "user": {
    "id": 1,
    "username": "user",
    "email": "user@example.com",
    "first_name": "",
    "last_name": "",
    "created_at": "2026-04-05T12:00:00Z",
    "updated_at": "2026-04-05T12:00:00Z"
  },
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
}
```

### Register
```
POST /api/users/register/
```

**Request**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response**
Same as login response.

### Get Current User
```
GET /api/users/me/
```

**Headers**
```
Authorization: Token <token>
```

**Response**
```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "created_at": "2026-04-05T12:00:00Z",
  "updated_at": "2026-04-05T12:00:00Z"
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```
