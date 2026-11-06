# NutriPrecio

Comparador de precios de alimentos entre distintas tiendas. Permite buscar un producto, ver su precio en cada tienda (con descuentos y disponibilidad) y comparar dónde conviene comprar. Los vendedores pueden registrar su tienda desde un panel propio.

Proyecto del curso de Ingeniería de Software · Universidad del Desarrollo · 2026 (Sprint I, metodología Scrum).

## Tecnologías

- **Backend:** Django 4.2 + Django REST Framework, autenticación por token, `django-filter`
- **Frontend:** Angular 21
- **Base de datos:** SQLite en desarrollo

## Funcionalidades

- Búsqueda de productos por nombre y categoría (con subcategorías)
- Comparación de precios del mismo producto entre tiendas
- Registro e inicio de sesión de usuarios
- Rol **vendedor**: registro de tienda y panel de gestión
- Datos de demostración con `python manage.py seed_data`

## API

| Ruta | Recurso |
|---|---|
| `/api/products/` | Productos |
| `/api/prices/` | Precios por tienda |
| `/api/stores/` | Tiendas |
| `/api/categories/` | Categorías |
| `/api/users/` | Registro, login y perfil |

## Cómo ejecutarlo

**Backend**

```bash
cd nutriprecio-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

**Frontend**

```bash
cd nutriprecio-frontend
npm install
npm start          # http://localhost:4200
```

## Documentación

En [`docs/`](docs/) están el diagrama de clases, el informe y la presentación del Sprint I y el Sprint Backlog.
