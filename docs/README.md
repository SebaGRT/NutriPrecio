# NutriPrecio - Documentación del Proyecto

## Descripción General

**NutriPrecio** es una plataforma de comparación de precios de alimentos saludables, similar a Solotodo.cl pero enfocada en productos frescos y groceries nutritivos. Permite a los usuarios buscar, comparar y encontrar los mejores precios en supermarkets y tiendas locales de Chile.

---

## Stack Tecnológico

### Backend
- **Framework**: Django 6.0
- **API**: Django REST Framework
- **Base de datos**: SQLite (desarrollo) / MySQL (producción)
- **Autenticación**: Django Token Authentication
- **Paquetes**: django-cors-headers, django-filter, Pillow

### Frontend
- **Framework**: Angular 19 (standalone components)
- **UI Library**: Angular Material
- **Estilos**: SCSS
- **Estado**: RxJS (servicios con Observables)

---

## Estructura del Proyecto

```
nutriprecio-backend/
├── manage.py                  # Django management script
├── requirements.txt           # Python dependencies
├── nutriprecio/              # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── apps/                     # Django apps
    ├── core/                 # Shared functionality (placeholder)
    ├── stores/               # Store management
    │   ├── models.py
    │   ├── views.py
    │   ├── serializers.py
    │   └── urls.py
    ├── products/             # Product catalog
    ├── prices/               # Price tracking
    ├── categories/           # Product categories
    └── users/                # User authentication

nutriprecio-frontend/
├── src/
│   ├── app/
│   │   ├── core/            # Guards, interceptors, services
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   └── services/
│   │   │       ├── api.service.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── product.service.ts
│   │   │       ├── store.service.ts
│   │   │       └── category.service.ts
│   │   ├── shared/           # Reusable components
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   ├── loading-spinner/
│   │   │   │   └── product-card/
│   │   │   └── pipes/
│   │   │       └── currency-format.pipe.ts
│   │   └── features/         # Page components
│   │       ├── home/
│   │       ├── search/
│   │       ├── product/
│   │       ├── stores/
│   │       ├── compare/
│   │       └── auth/
│   │           ├── login/
│   │           └── register/
│   ├── environments/
│   │   └── environment.ts
│   ├── styles.scss
│   └── main.ts
├── angular.json
└── package.json
```

---

## Cómo Ejecutar el Proyecto

### Prerrequisitos
- Python 3.10+
- Node.js 18+
- npm

### Backend

```bash
# 1. Entrar al directorio
cd nutriprecio-backend

# 2. Crear entorno virtual
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate     # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Ejecutar migrate (primera vez)
USE_SQLITE=True python manage.py migrate

# 5. Crear superuser (opcional)
USE_SQLITE=True python manage.py createsuperuser

# 6. Iniciar servidor
USE_SQLITE=True python manage.py runserver
```

El backend estará disponible en: `http://localhost:8000`

### Frontend

```bash
# 1. Entrar al directorio
cd nutriprecio-frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm start
```

El frontend estará disponible en: `http://localhost:4200`

---

## API Endpoints

### Products
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products/` | Listar productos (paginado) |
| GET | `/api/products/<slug>/` | Detalle de producto |
| GET | `/api/products/search/?q=query` | Buscar productos |

### Stores
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/stores/` | Listar tiendas |
| GET | `/api/stores/<slug>/` | Detalle de tienda |

### Categories
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categories/` | Listar categorías (jerárquico) |

### Prices
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/prices/` | Listar precios |
| GET | `/api/prices/compare/?product=slug` | Comparar precios |

### Users
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/users/login/` | Iniciar sesión (retorna token) |
| POST | `/api/users/register/` | Registrar usuario |
| GET | `/api/users/me/` | Obtener usuario actual |

---

## Modelos de Datos

### Store
- `id`: integer
- `name`: string (255)
- `slug`: string (unique)
- `logo`: image
- `website`: URL
- `is_active`: boolean
- `created_at`: datetime
- `updated_at`: datetime

### Category
- `id`: integer
- `name`: string (255)
- `slug`: string (unique)
- `parent`: foreign key (self)
- `image`: image

### Product
- `id`: integer
- `name`: string (500)
- `slug`: string (unique)
- `brand`: string (255)
- `category`: foreign key (Category)
- `unit`: string (50) - e.g., "kg", "lb", "unit"
- `image`: image
- `description`: text
- `barcode`: string (50)
- `created_at`: datetime
- `updated_at`: datetime

### Price
- `id`: integer
- `product`: foreign key (Product)
- `store`: foreign key (Store)
- `price`: decimal (10,2)
- `original_price`: decimal (10,2)
- `discount_percentage`: decimal (5,2)
- `url`: URL
- `in_stock`: boolean
- `recorded_at`: datetime

### User (Custom)
- Hereda de AbstractUser
- `email`: email (unique)
- `created_at`: datetime
- `updated_at`: datetime

---

## Autenticación

### Token Authentication
El proyecto usa Django Token Authentication. Para endpoints protegidos:

1. **Login**: POST a `/api/users/login/` con `username` y `password`
2. **Recibir token**: La respuesta incluye `token` y `user`
3. **Usar token**: Incluir header `Authorization: Token <token>`

### Frontend
El token se maneja automáticamente mediante:
- `AuthService`: gestiona login/logout/registro
- `authInterceptor`: añade el token a todas las requests
- `errorInterceptor`: maneja errores 401 (redirecciona a login)

### Permisos
- `IsAuthenticatedOrReadOnly`: Permite lectura sin auth, escritura con auth

---

## Guías para AI Agents

### Agregar una nueva feature (Backend)

1. **Crear modelo** en `apps/<app>/models.py`
2. **Crear serializer** en `apps/<app>/serializers.py`
3. **Crear view** en `apps/<app>/views.py`
4. **Crear URLs** en `apps/<app>/urls.py`
5. **Registrar en urls principal** en `nutriprecio/urls.py`
6. **Ejecutar migraciones**:
   ```bash
   USE_SQLITE=True python manage.py makemigrations <app>
   USE_SQLITE=True python manage.py migrate
   ```

### Agregar una nueva feature (Frontend)

1. **Crear componente** en `src/app/features/<feature>/`
2. **Agregar ruta** en `app.routes.ts`:
   ```typescript
   {
     path: '<path>',
     loadComponent: () => import('./features/<feature>/...').then(m => m.<Component>),
   }
   ```
3. **Crear servicio** si es necesario en `core/services/`
4. **Usar ApiService** para llamadas HTTP:
   ```typescript
   private api = inject(ApiService);
   
   getData() {
     return this.api.get<DataType>('/endpoint/');
   }
   ```

### Agregar nueva página

1. Crear componente en `features/<page>/`
2. Agregar ruta en `app.routes.ts`
3. Crear template y estilos
4. Agregar link en Navbar si es necesario

### Variables de Entorno

**Backend** (en `nutriprecio/settings.py`):
- `DEBUG`: True/False
- `SECRET_KEY`: Django secret key
- `ALLOWED_HOSTS`: Lista de hosts separados por coma
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`: MySQL config
- `USE_SQLITE`: True para usar SQLite

**Frontend** (en `environments/environment.ts`):
- `apiUrl`: URL base del API (default: `http://localhost:8000/api`)

---

## Comandos Útiles

### Django
```bash
# Crear app
python manage.py startapp <app_name> apps/<app_name>

# Shell interactivo
python manage.py shell

# Recargar datos
python manage.py flush

# Recargar servidor automático (requiere pip install django-watchman)
USE_SQLITE=True python manage.py runserver --reload
```

### Angular
```bash
# Generar componente
npx ng generate component features/<name>

# Generar servicio
npx ng generate service core/services/<name>

# Build producción
npm run build

# Tests
npx ng test
```

---

## Notas Importantes

1. **CORS**: Habilitado para todos los orígenes en desarrollo (`DEBUG=True`). Restringir en producción.

2. **Slugs**: Todos los modelos tienen `slug` único para URLs amigables.

3. **Paginación**: DRF usa `PageNumberPagination` con PAGE_SIZE=20.

4. **Imágenes**: Se almacenan en `media/` (configurado en settings).

5. **Anonymous search**: Los endpoints de lectura permiten acceso sin autenticación.

6. **DateTime**: Zona horaria configurada como `America/Santiago`.

---

## Estado del Proyecto

El esqueleto base está completo con:
- ✅ Modelos configurados
- ✅ API REST funcional
- ✅ Autenticación token
- ✅ Frontend con routing
- ✅ Componentes UI básicos

**Próximos pasos sugeridos**:
1. Agregar datos de ejemplo (stores, products, prices)
2. Implementar historial de precios
3. Agregar filtros avanzados
4. Mejorar UI/UX
5. Configurar MySQL para producción
