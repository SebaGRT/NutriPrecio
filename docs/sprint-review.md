# Sprint Review — Sprint I | NutriPrecio

## Objetivo del Sprint I

Implementar las funcionalidades base de la plataforma NutriPrecio: registro de tienda para vendedores independientes (MV-03), sistema de login y registro con autenticacion por tokens (MV-52), y panel de control privado para vendedores (MV-54).

---

## Funcionalidades Entregadas

### MV-52: Login y Registro (COMPLETO)

Registro de usuarios con encriptacion de contrasenas mediante `create_user()` de Django. Inicio de sesion con generacion y retorno de tokens de autenticacion. Interceptor HTTP en el frontend (`authInterceptor`) que incluye el token automaticamente en cada request. Guard de rutas protegidas (`authGuard`) que verifica existencia del token y redirige al login si no hay sesion activa. Formularios de registro e inicio de sesion con validacion de campos en el frontend.

### MV-03: Registro de Tienda (COMPLETO)

Modelo `Store` con campo `owner` (ForeignKey a User) que vincula cada tienda al usuario vendedor que la creo. Serializer y ViewSet con permisos de autenticacion para creacion y edicion, acceso publico de solo lectura para listados. Endpoint CRUD funcional en `/api/stores/`. Formulario de registro de tienda en el frontend (`store-form.component`) con campos de nombre, logo y sitio web, integrado al dashboard mediante accion rapida.

### MV-54: Dashboard del Vendedor (COMPLETO)

Vista de inicio del dashboard con mensaje de bienvenida personalizado usando el nombre del usuario. Perfil del usuario con avatar de iniciales, correo electronico y nombre completo. Indicadores de estado visual (Cuenta Activa, chip de Vendedor para usuarios `is_seller`). Acciones rapidas con navegacion al formulario de registro de tienda. Validacion de rol vendedor en el `authGuard`: usuarios no vendedores son redirigidos al home con mensaje de aviso.

---

## Funcionalidades NO Entregadas / Parciales

### Dashboard con sidebar de navegacion

El dashboard actual es una vista de una sola pagina con secciones de perfil, estadisticas y acciones rapidas. No se implemento el layout con barra lateral de navegacion que se muestra en el diagrama de actividades (Flow MV-54, paso F5: "Mostrar Sidebar con navegacion").

### Estado real del perfil de tienda

El dashboard muestra tarjetas de estadisticas con valor "—" y texto "Proximamente" porque no hay integracion activa con la API para consultar y mostrar datos reales de la tienda del vendedor (productos publicados, estado de la tienda). El backend tiene los endpoints disponibles pero el frontend no los consume en esta iteracion.

### Gestion de productos desde el dashboard

El boton de "Configurar Perfil" en las acciones rapidas esta deshabilitado con etiqueta "Proximamente". La gestion de productos (CRUD) no forma parte del alcance del Sprint I pero estaba contemplada como accion futura en el diseno del dashboard.

---

## Plan de Demostracion

| Paso | Accion | URL / Endpoint | Resultado esperado |
|------|--------|---------------|-------------------|
| 1 | Registrar usuario vendedor | `/register` | Checkbox "Quiero ser vendedor" activado, cuenta creada |
| 2 | Iniciar sesion | `/login` | Token almacenado, redireccion a home |
| 3 | Navegar al Dashboard | `/dashboard` | Mensaje de bienvenida, perfil con avatar, chip de vendedor |
| 4 | Click en "Registrar Tienda" | `/dashboard/store-form` | Formulario con campos nombre, logo, sitio web |
| 5 | Completar formulario y enviar | POST `/api/stores/` | Tienda creada, vinculada al usuario vendedor |
| 6 | Volver al Dashboard | `/dashboard` | Confirmacion visual de tienda registrada |

**Backup plan**: Si la demo en vivo falla, usar capturas de pantalla pre-generadas de cada paso.

---

## Metricas del Sprint

| Indicador | Valor |
|-----------|-------|
| Tareas planificadas | 9 |
| Tareas completadas | 7 de 9 (78%) |
| Tareas parciales | 2 de 9 (22%) |
| Horas estimadas | 47 horas |
| Horas completadas | ~35 horas |
| Velocidad del equipo | 74% del scope entregado |

### Desglose por Historia de Usuario

| Historia | Tareas | Estado |
|----------|--------|--------|
| MV-03 (Registro de Tienda) | 3 tareas | 2 completadas, 1 parcial |
| MV-52 (Login y Registro) | 3 tareas | 3 completadas |
| MV-54 (Dashboard del Vendedor) | 3 tareas | 2 completadas, 1 parcial |

---

## Feedback Obtenido

No se obtuvo feedback formal de stakeholders durante el Sprint I. Las revisiones se realizaron internamente entre miembros del equipo durante el desarrollo.

---

## Equipo

| Rol | Nombre |
|-----|--------|
| Scrum Master | Sebastian Herrera |
| Product Owner | Ignacio Herrera |
| Developer | Vicente Sepulveda |
| Developer | Matias Ramirez |
| Developer | Benjamin Buzeta |
| Developer | Fernando Sepulveda |
