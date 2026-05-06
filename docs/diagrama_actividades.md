# Diagrama de Actividades — NutriPrecio

## 1. Descripción

Los diagramas de actividades modelan los flujos de trabajo principales del sistema NutriPrecio, basados en las historias de usuario del Sprint Backlog. Se utiliza la notación UML con swimlanes (carriles) organizados en cuatro categorías: **Usuario**, **Frontend**, **Backend** y **Base de Datos**.

---

## 2. Flujo MV-03: Registro de Tienda por Vendedor

> _"Como un vendedor independiente, necesito poder registrar mi tienda o pyme en la plataforma."_

```mermaid
flowchart TD
    subgraph Usuario
        U1(("●")) --> U2["Acceder a NutriPrecio"]
        U2 --> U3{"¿Está autenticado?"}
        U3 -- No --> U4["Ir a Iniciar sesión"]
        U4 --> U3
        U3 -- Sí --> U5["Solicitar registro de tienda"]
        U14["Recibir confirmación de registro"]
        U14 --> U15["Revisar datos de la tienda publicada"]
        U15 --> U16{"¿Desea editar datos?"}
        U16 -- Sí --> U17["Modificar información de la tienda"]
        U16 -- No --> U18(("◎"))
    end

    subgraph Frontend
        F1["Mostrar formulario de datos de tienda"]
        F2["Vendedor ingresa: nombre, logo, sitio web"]
        F3["Validar campos del formulario"]
        F4{"¿Datos válidos?"}
        F5["Mostrar errores de validación"]
        F6["Enviar datos al Backend"]
        F7["Mostrar tienda registrada exitosamente"]
        F8["Enviar datos editados al Backend"]
    end

    subgraph Backend
        B1["Recibir datos en POST /api/stores/"]
        B2["Verificar Token de autenticación"]
        B3{"¿Usuario autenticado?"}
        B4["Retornar error 401"]
        B5["Vincular Tienda al Usuario"]
        B6["Generar slug único"]
        B7["Guardar logo en /media/stores/"]
        B8["Retornar respuesta con datos de la tienda"]
        B9["Recibir datos en PUT /api/stores/slug/"]
        B10["Retornar datos actualizados"]
    end

    subgraph Base_de_Datos["Base de Datos"]
        DB1[("INSERT en tabla Store")]
        DB2{"¿Slug ya existe?"}
        DB3[("Regenerar slug")]
        DB4[("Guardar relación Store-User")]
        DB5[("UPDATE registro Store")]
    end

    U5 --> F1
    F1 --> F2
    F2 --> F3
    F3 --> F4
    F4 -- No --> F5
    F5 --> F2
    F4 -- Sí --> F6
    F6 --> B1
    B1 --> B2
    B2 --> B3
    B3 -- No --> B4
    B4 --> F5
    B3 -- Sí --> B5
    B5 --> B6
    B6 --> DB1
    DB1 --> DB2
    DB2 -- Sí --> DB3
    DB3 --> DB1
    DB2 -- No --> DB4
    DB4 --> B7
    B7 --> B8
    B8 --> F7
    F7 --> U14
    U17 --> F8
    F8 --> B9
    B9 --> DB5
    DB5 --> B10
    B10 --> U15
```

### Descripción del Flujo

| Paso | Categoría | Acción |
|------|-----------|--------|
| 1 | Usuario | Accede a la plataforma y verifica si está autenticado. |
| 2 | Frontend | Muestra el formulario para ingresar datos de la tienda (nombre, logo, sitio web). |
| 3 | Frontend | Valida los campos del formulario antes de enviar. |
| 4 | Backend | Recibe los datos, verifica autenticación y vincula la tienda al usuario. |
| 5 | Base de Datos | Verifica unicidad del slug, crea el registro en Store y la relación Store-User. |
| 6 | Backend | Almacena el logo y retorna los datos de la tienda creada. |
| 7 | Usuario | Revisa los datos publicados y decide si editarlos. |

**Tareas del Sprint asociadas:**
- Backend: Crear tabla en BDD para Perfiles de Tienda vinculada al usuario (Vicente Sepúlveda)
- Frontend: Crear formulario para que el vendedor ingrese datos de su pyme (Benjamín Buzeta)
- Backend: Crear endpoint para recibir y guardar información pública de la tienda (Matías Ramírez)

---

## 3. Flujo MV-52: Registro e Inicio de Sesión

> _"Como un futuro comprador, necesito un login, con la finalidad de poder crear mi cuenta."_

```mermaid
flowchart TD
    subgraph Usuario
        U1(("●")) --> U2["Acceder a NutriPrecio"]
        U2 --> U3{"¿Tiene cuenta?"}
        U3 -- No --> U4["Seleccionar Registrarse"]
        U3 -- Sí --> U5["Seleccionar Iniciar sesión"]
    end

    subgraph Frontend
        F1["Mostrar formulario de Registro"]
        F2["Ingresar: username, email, contraseña"]
        F3["Validar formato de campos"]
        F4{"¿Formato válido?"}
        F5["Mostrar errores de formato"]
        F6["Enviar datos al Backend"]
        F7["Mostrar formulario de Login"]
        F8["Ingresar: username, contraseña"]
        F9["Almacenar Token en localStorage"]
        F10["Configurar authInterceptor con Token"]
        F11["Redirigir a página principal"]
        F12["Mostrar error: credenciales inválidas"]
    end

    subgraph Backend
        B1["POST /api/users/register/"]
        B2["Encriptar contraseña con create_user()"]
        B3["Generar Token de autenticación"]
        B4["Retornar user + token"]
        B5["POST /api/users/login/"]
        B6["Validar credenciales"]
        B7{"¿Credenciales válidas?"}
        B8["Obtener o crear Token"]
        B9["Retornar error 401"]
    end

    subgraph Base_de_Datos["Base de Datos"]
        DB1[("INSERT en tabla User")]
        DB2{"¿Email ya existe?"}
        DB3[("Retornar error de duplicado")]
        DB4[("INSERT en tabla Token")]
        DB5[("SELECT User por credenciales")]
        DB6{"¿Usuario encontrado?"}
        DB7[("SELECT Token del usuario")]
    end

    U4 --> F1
    F1 --> F2
    F2 --> F3
    F3 --> F4
    F4 -- No --> F5
    F5 --> F2
    F4 -- Sí --> F6
    F6 --> B1
    B1 --> B2
    B2 --> DB1
    DB1 --> DB2
    DB2 -- Sí --> DB3
    DB3 --> F12
    DB2 -- No --> B3
    B3 --> DB4
    DB4 --> B4
    B4 --> F9

    U5 --> F7
    F7 --> F8
    F8 --> B5
    B5 --> B6
    B6 --> DB5
    DB5 --> DB6
    DB6 -- No --> B7
    B7 -- No --> B9
    B9 --> F12
    F12 --> F7
    DB6 -- Sí --> B7
    B7 -- Sí --> B8
    B8 --> DB7
    DB7 --> B4

    F9 --> F10
    F10 --> F11
    F11 --> END1(("◎"))
```

### Descripción del Flujo

| Paso | Categoría | Acción |
|------|-----------|--------|
| 1 | Usuario | Decide si registrarse (nuevo) o iniciar sesión (existente). |
| 2 | Frontend | Muestra el formulario correspondiente y valida el formato de los campos. |
| 3 | Backend (Registro) | Encripta la contraseña con `create_user()` y genera un Token. |
| 4 | Base de Datos | Verifica si el email ya existe; si no, crea registros en User y Token. |
| 5 | Backend (Login) | Valida las credenciales consultando la BDD. |
| 6 | Base de Datos | Busca el usuario por credenciales y verifica si existe. |
| 7 | Frontend | Almacena el Token en localStorage, configura el interceptor y redirige. |

**Tareas del Sprint asociadas:**
- Backend: Configurar la BDD para usuarios y encriptación de contraseñas (Vicente Sepúlveda)
- Frontend: Diseñar interfaz del formulario de Registro e Inicio de Sesión (Fernando Sepúlveda)
- Backend: Desarrollar lógica para validación de credenciales y tokens de sesión (Benjamín Buzeta)

---

## 4. Flujo MV-54: Acceso al Dashboard del Vendedor

> _"Como un vendedor independiente logueado, necesito acceder a un panel de control privado."_

```mermaid
flowchart TD
    subgraph Usuario
        U1(("●")) --> U2["Navegar al Dashboard"]
        U2 --> U3{"¿Desea acceder al panel?"}
        U3 -- No --> U4(("◎"))
        U3 -- Sí --> U5["Solicitar acceso al Dashboard"]
    end

    subgraph Frontend
        F1["authGuard verifica autenticación"]
        F2{"¿Token existe en localStorage?"}
        F3["Redirigir a /login con returnUrl"]
        F4["Cargar Layout del Dashboard"]
        F5["Mostrar Sidebar con navegación"]
        F6["Mostrar vista de Inicio"]
        F7["Mostrar mensaje de bienvenida"]
        F8{"¿Tienda registrada?"}
        F9["Mostrar estado actual del perfil de tienda"]
        F10["Mostrar invitación a registrar tienda"]
    end

    subgraph Backend
        B1["GET /api/users/me/"]
        B2["Verificar Token en header Authorization"]
        B3{"¿Token válido?"}
        B4["Retornar datos del usuario"]
        B5["Retornar error 401"]
        B6["GET /api/stores/ filtrado por usuario"]
        B7{"¿Tiene tienda asociada?"}
        B8["Retornar datos de la tienda"]
        B9["Retornar lista vacía"]
    end

    subgraph Base_de_Datos["Base de Datos"]
        DB1[("SELECT en tabla Token")]
        DB2{"¿Token existe y es válido?"}
        DB3[("SELECT en tabla User")]
        DB4[("SELECT en tabla Store por owner")]
    end

    U5 --> F1
    F1 --> F2
    F2 -- No --> F3
    F3 --> U1
    F2 -- Sí --> F4

    F4 --> B1
    B1 --> B2
    B2 --> DB1
    DB1 --> DB2
    DB2 -- No --> B5
    B5 --> F3
    DB2 -- Sí --> DB3
    DB3 --> B3
    B3 -- No --> B5
    B3 -- Sí --> B4
    B4 --> F5

    F5 --> F6
    F6 --> F7
    F7 --> B6
    B6 --> DB4
    DB4 --> B7
    B7 -- Sí --> B8
    B8 --> F8
    B7 -- No --> B9
    B9 --> F8
    F8 -- Sí --> F9
    F9 --> END1(("◎"))
    F8 -- No --> F10
    F10 --> END1
```

### Descripción del Flujo

| Paso | Categoría | Acción |
|------|-----------|--------|
| 1 | Usuario | Decide si desea acceder al panel de control y solicita acceso. |
| 2 | Frontend | El `authGuard` verifica si existe un Token en localStorage. |
| 3 | Backend | Verifica el Token contra la BDD mediante el header Authorization. |
| 4 | Base de Datos | Valida existencia del Token, consulta User y Store por owner. |
| 5 | Backend | Verifica si el vendedor tiene una tienda asociada. |
| 6 | Frontend | Según si tiene tienda registrada, muestra el perfil o una invitación a registrar. |

**Tareas del Sprint asociadas:**
- Backend: Configurar rutas protegidas para que solo vendedores logueados vean el panel (Vicente Sepúlveda)
- Frontend: Diseñar y maquetar el Layout del Dashboard (Benjamín Buzeta)
- Frontend: Crear vista de Inicio del Dashboard con bienvenida y estado del perfil (Sebastián Herrera)

---

## 5. Resumen de Flujos

| Flujo | Historia | Descripción |
|-------|----------|-------------|
| Registro de Tienda | MV-03 | El vendedor registra su pyme completando un formulario; el backend crea el perfil vinculado al usuario y persiste en la BDD. |
| Registro e Inicio de Sesión | MV-52 | Crear cuenta o autenticarse con validación de credenciales, encriptación y gestión de tokens en la BDD. |
| Acceso al Dashboard | MV-54 | Acceso protegido al panel de control con verificación de token contra la BDD. |
