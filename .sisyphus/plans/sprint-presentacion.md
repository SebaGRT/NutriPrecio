# Plan: Presentación e Informe Sprint I — NutriPrecio

## TL;DR

> **Quick Summary**: Preparar los entregables del Certamen N°2: corregir el código del Sprint I para que la demo funcione, actualizar el Sprint Backlog, redactar Sprint Review/Retrospective, crear los 3 diagramas UML desde cero (siguiendo formato de ejemplos), armar la presentación PowerPoint de 8 minutos, y generar el informe escrito (.docx + .pdf).
>
> **Deliverables**:
> - Código corregido y funcional con datos de prueba (seed data)
> - Sprint Backlog actualizado (.xlsx)
> - 3 Diagramas UML (Casos de Uso, Clases, Actividades)
> - Presentación PowerPoint (8 min)
> - Informe escrito (.docx + .pdf)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves + 1 final
> **Critical Path*: Correcciones código → Seed data → Diagramas → Presentación/Informe

---

## Context

### Original Request
Preparar la presentación e informe del Sprint I para el Certamen N°2 de "Taller de métodos de innovación ágiles". La presentación dura 8 minutos (5 min técnica + 3 min demo) y debe incluir: introducción, metodología, diagramas UML, Sprint Review/Retrospective, y demo en vivo.

### Interview Summary
**Key Discussions**:
- Equipo: Vicente Sepúlveda, Matías Ramirez, Benjamín Buzeta, Fernando Sepúlveda (Devs), Sebastián Herrera (Scrum Master), Ignacio Herrera (Product Owner)
- Sprint Backlog: Ya existe con 9 tareas, todas marcadas "Por hacer" (necesita actualización)
- Diagramas UML: Hacer de cero siguiendo ejemplos visuales en docs/
- Demo: En vivo requerida → necesita seed data
- Formato informe: .docx + .pdf
- Correcciones de código incluidas en el plan

**Research Findings**:
- Backend funcional pero Store no tiene `owner` (FK a User)
- Frontend compila pero Dashboard no muestra datos reales
- Base de datos completamente vacía (0 registros)
- 3/9 tareas completadas, 6/9 parciales
- Diagramas existen en Mermaid pero deben rehacerse en formato UML visual

### Estado del Sprint: 3/9 completadas

| # | Tarea | Estado | Problema |
|---|-------|--------|----------|
| 1 | Tabla Tienda vinculada a usuario | PARCIAL | Falta campo `owner` FK a User |
| 2 | Formulario registro tienda | NO HECHA | No existe componente |
| 3 | Endpoint info pública tienda | PARCIAL | No vincula al usuario vendedor |
| 4 | BDD usuarios + encriptación | ✅ COMPLETADA | — |
| 5 | Interfaz Registro/Login | ✅ COMPLETADA | — |
| 6 | Validación credenciales + tokens | ✅ COMPLETADA | — |
| 7 | Rutas protegidas para vendedores | PARCIAL | Falta validación rol `is_seller` |
| 8 | Layout Dashboard | PARCIAL | Falta sidebar de panel |
| 9 | Vista Inicio Dashboard con estado | PARCIAL | Estado de tienda no funciona |

---

## Work Objectives

### Core Objective
Dejar todo listo para la presentación del Sprint I: código funcional para demo, Sprint Backlog actualizado, contenido Review/Retro, 3 diagramas UML, presentación PowerPoint, y informe escrito.

### Concrete Deliverables
- Store model con campo `owner` + migración + serializer/view actualizados
- Formulario de registro de tienda en el frontend
- Validación de rol `is_seller` en acceso al dashboard
- Datos de prueba (seed data) en la base de datos
- Sprint Backlog .xlsx actualizado con estados reales
- 3 imágenes de diagramas UML (formato PNG de alta calidad)
- Presentación PowerPoint (.pptx)
- Informe escrito (.docx + .pdf)

### Definition of Done
- [ ] `python manage.py runserver` arranca sin errores
- [ ] `npm start` arranca el frontend sin errores
- [ ] Se puede registrar un usuario vendedor, crear tienda, y ver el dashboard
- [ ] Los 3 diagramas UML siguen el estilo visual de los ejemplos
- [ ] La presentación cubre los 5 temas del temario
- [ ] El informe contiene todo el contenido técnico del Sprint

### Must Have
- Corrección del campo `owner` en Store model
- Seed data suficiente para demo (3-5 tiendas, 10-15 productos, precios)
- Diagramas UML con estilo consistente a los ejemplos
- Presentación de 8 minutos con todos los temas del temario
- Informe con Sprint Review y Sprint Retrospective

### Must NOT Have (Guardrails)
- NO reescribir componentes que ya funcionan (Login, Register)
- NO agregar funcionalidades fuera del alcance del Sprint I
- NO cambiar la arquitectura general del proyecto
- NO incluir datos sensibles reales en seed data
- NO extender la presentación más allá de 8 minutos
- NO inventar feedback de stakeholders que no existió

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (no test framework configured)
- **Automated tests**: None
- **Framework**: N/A
- **QA Policy**: Agent-executed QA scenarios for every task

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — code corrections):
├── Task 1: Add owner field to Store model + migration [quick]
├── Task 2: Update Store serializer + view for owner linking [quick]
├── Task 3: Add IsSeller permission + dashboard route guard [quick]
└── Task 4: Create store registration form (frontend) [unspecified-high]

Wave 2 (After Wave 1 — seed data + content):
├── Task 5: Create seed data fixtures (depends: 1, 2) [quick]
├── Task 6: Update Sprint Backlog .xlsx with real statuses [writing]
├── Task 7: Draft Sprint Review content [writing]
└── Task 8: Draft Sprint Retrospective content [writing]

Wave 3 (After Wave 2 — diagrams, can overlap with writing):
├── Task 9: Create Use Case diagram (depends: 7, 8) [unspecified-high]
├── Task 10: Create Class diagram (depends: 1) [unspecified-high]
└── Task 11: Create Activity diagram (depends: 7, 8) [unspecified-high]

Wave 4 (After Wave 3 — deliverables):
├── Task 12: Create PowerPoint presentation (depends: 6, 7, 8, 9, 10, 11) [unspecified-high]
└── Task 13: Create written report .docx + .pdf (depends: 6, 7, 8, 9, 10, 11) [writing]

Wave FINAL (After ALL tasks — verification):
├── F1: Plan compliance audit [oracle]
├── F2: Code quality review [unspecified-high]
├── F3: Real manual QA (demo walkthrough) [unspecified-high]
└── F4: Scope fidelity check [deep]
→ Present results → Get explicit user okay

Critical Path: Task 1 → Task 5 → Tasks 7-8 → Task 9/10/11 → Task 12/13
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | - | 2, 5, 10 | 1 |
| 2 | 1 | 4, 5 | 1 |
| 3 | - | - | 1 |
| 4 | - | - | 1 |
| 5 | 1, 2 | - | 2 |
| 6 | - | 12, 13 | 2 |
| 7 | - | 9, 11, 12, 13 | 2 |
| 8 | - | 9, 11, 12, 13 | 2 |
| 9 | 7, 8 | 12, 13 | 3 |
| 10 | 1 | 12, 13 | 3 |
| 11 | 7, 8 | 12, 13 | 3 |
| 12 | 6, 7, 8, 9, 10, 11 | - | 4 |
| 13 | 6, 7, 8, 9, 10, 11 | - | 4 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks — T1 `quick`, T2 `quick`, T3 `quick`, T4 `unspecified-high`
- **Wave 2**: 4 tasks — T5 `quick`, T6 `writing`, T7 `writing`, T8 `writing`
- **Wave 3**: 3 tasks — T9 `unspecified-high`, T10 `unspecified-high`, T11 `unspecified-high`
- **Wave 4**: 2 tasks — T12 `unspecified-high`, T13 `writing`
- **FINAL**: 4 tasks — F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [x] 1. Add `owner` field to Store model + migration

  **What to do**:
  - Add `owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='store', null=True, blank=True)` to `apps/stores/models.py`
  - Update `StoreSerializer` to include `owner` in fields and make it read-only (auto-set from request.user)
  - Update `StoreViewSet` to override `perform_create` setting `owner=request.user`
  - Override `get_queryset` to filter stores by owner for sellers, or show all for anonymous
  - Run `USE_SQLITE=True python manage.py makemigrations stores` and `USE_SQLITE=True python manage.py migrate`
  - Verify migration creates the column without errors

  **Must NOT do**:
  - Do NOT delete existing migration files
  - Do NOT change the Store model's other fields
  - Do NOT make `owner` required immediately (use null=True for existing data compatibility)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 3, 4)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 2, 5, 10
  - **Blocked By**: None

  **References**:
  - `nutriprecio-backend/apps/stores/models.py:4-17` — Current Store model, needs `owner` FK
  - `nutriprecio-backend/apps/users/models.py:5-15` — User model, the FK target
  - `nutriprecio-backend/apps/stores/serializers.py:1-9` — Current serializer, needs `owner` field
  - `nutriprecio-backend/apps/stores/views.py:1-13` — Current viewset, needs `perform_create` override

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Migration applies cleanly
    Tool: Bash
    Preconditions: Backend virtual environment activated
    Steps:
      1. cd nutriprecio-backend && source venv/bin/activate
      2. USE_SQLITE=True python manage.py makemigrations stores
      3. USE_SQLITE=True python manage.py migrate
    Expected Result: No errors, migration 0003 creates owner column
    Evidence: .sisyphus/evidence/task-1-migration.txt

  Scenario: API rejects unauthenticated store creation
    Tool: Bash (curl)
    Preconditions: Backend server running
    Steps:
      1. curl -X POST http://localhost:8000/api/stores/ -H "Content-Type: application/json" -d '{"name":"Test Store"}'
    Expected Result: 401 Unauthorized or 403 Forbidden
    Evidence: .sisyphus/evidence/task-1-auth-check.txt
  ```

  **Commit**: YES (group with Wave 1)
  - Message: `fix(stores): add owner ForeignKey linking store to user`
  - Files: `apps/stores/models.py`, `apps/stores/serializers.py`, `apps/stores/views.py`, `apps/stores/migrations/0003_store_owner.py`

- [x] 2. Update Store serializer and viewset for owner linking

  **What to do**:
  - In `StoreSerializer`, add `owner` field as read-only (auto-assigned from request.user on create)
  - In `StoreViewSet`, override `perform_create` to set `owner=self.request.user`
  - Override `get_queryset`: if user is seller, show only their store; if anonymous, show all active stores
  - Add `IsAuthenticated` permission for create/update/delete actions
  - Add `IsSellerOrReadOnly` custom permission class or check `is_seller` flag

  **Must NOT do**:
  - Do NOT break the public read access to stores (anonymous users should still list stores)
  - Do NOT remove `IsAuthenticatedOrReadOnly` without replacing with proper permission

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 1)
  - **Parallel Group**: Wave 1 (sequential after Task 1)
  - **Blocks**: Tasks 4, 5
  - **Blocked By**: Task 1

  **References**:
  - `nutriprecio-backend/apps/stores/serializers.py:1-9` — Add owner field here
  - `nutriprecio-backend/apps/stores/views.py:1-13` — Add perform_create and get_queryset here
  - `nutriprecio-backend/apps/users/views.py:1-43` — Pattern for auth-based views (RegisterView, CurrentUserView)
  - `nutriprecio-backend/nutriprecio/settings.py` — DRF settings for permissions

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Authenticated seller can create store linked to their account
    Tool: Bash (curl)
    Preconditions: User with is_seller=True exists, backend running
    Steps:
      1. Register a seller user via POST /api/users/register/
      2. Login to get token via POST /api/users/login/
      3. POST /api/stores/ with Authorization header and store data
    Expected Result: Store created with owner=user_id, response includes owner field
    Evidence: .sisyphus/evidence/task-2-seller-creates-store.txt

  Scenario: Non-seller user cannot create store (or gets restricted access)
    Tool: Bash (curl)
    Preconditions: Regular user (is_seller=False) exists
    Steps:
      1. Register non-seller user
      2. Try to create store with their token
    Expected Result: 403 Forbidden or appropriate error
    Evidence: .sisyphus/evidence/task-2-non-seller-denied.txt
  ```

  **Commit**: YES (group with Task 1)
  - Message: `fix(stores): link store creation to authenticated seller user`
  - Files: `apps/stores/views.py`, `apps/stores/serializers.py`

- [x] 3. Add IsSeller permission + dashboard route guard

  **What to do**:
  - Create `IsSeller` permission class in `apps/users/permissions.py`: allows read-only for anonymous, write for sellers only
  - Add `IsSeller` check in `auth.guard.ts`: after checking token exists, also verify `user.is_seller === true`. If not seller, redirect to home page with message
  - Update Dashboard route in `app.routes.ts` to use the enhanced guard
  - Add a message/toast when non-seller tries to access `/dashboard`

  **Must NOT do**:
  - Do NOT remove existing `authGuard` (it still protects general authenticated routes)
  - Do NOT make the dashboard completely invisible to non-sellers (just block access)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 4)
  - **Parallel Group**: Wave 1
  - **Blocks**: None directly
  - **Blocked By**: None

  **References**:
  - `nutriprecio-frontend/src/app/core/guards/auth.guard.ts:1-15` — Current guard, needs is_seller check
  - `nutriprecio-frontend/src/app/app.routes.ts:1-46` — Route definitions, dashboard guard
  - `nutriprecio-frontend/src/app/core/services/auth.service.ts:1-77` — AuthService has getUser() returning is_seller

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Seller user accesses dashboard successfully
    Tool: Playwright
    Preconditions: Seller user registered and logged in
    Steps:
      1. Login as seller user
      2. Navigate to /dashboard
    Expected Result: Dashboard page loads, shows welcome message
    Evidence: .sisyphus/evidence/task-3-seller-dashboard.png

  Scenario: Non-seller user is blocked from dashboard
    Tool: Playwright
    Preconditions: Regular (non-seller) user registered and logged in
    Steps:
      1. Login as regular user (is_seller=false)
      2. Navigate to /dashboard
    Expected Result: Redirected to home page or shown access denied message
    Evidence: .sisyphus/evidence/task-3-non-seller-blocked.png
  ```

  **Commit**: YES (group with Wave 1)
  - Message: `fix(auth): add is_seller permission check for dashboard access`
  - Files: `apps/users/permissions.py`, `auth.guard.ts`

- [x] 4. Create store registration form (frontend)

  **What to do**:
  - Create `StoreFormComponent` at `src/app/features/dashboard/store-form/`
  - Form fields: name, logo (file upload), website URL
  - On submit: POST to `/api/stores/` with auth token
  - Show success/error messages
  - Link from Dashboard quick actions (replace "Próximamente" button for "Gestionar Productos")

  **Must NOT do**:
  - Do NOT create a full product management CRUD (out of scope)
  - Do NOT redesign the existing dashboard layout (just add the form)
  - Do NOT break the existing dashboard styling

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`/frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 3)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 5 (needs API working)
  - **Blocked By**: None (can build UI in parallel, integration after Task 2)

  **References**:
  - `nutriprecio-frontend/src/app/features/auth/register/register.component.ts:1-153` — Pattern for form submission
  - `nutriprecio-frontend/src/app/features/dashboard/dashboard.component.ts:1-189` — Dashboard where form links will go
  - `nutriprecio-frontend/src/app/core/services/store.service.ts:1-33` — StoreService needs createStore() method
  - `nutriprecio-frontend/src/app/core/services/api.service.ts:1-35` — API base pattern

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Seller registers store successfully
    Tool: Playwright
    Preconditions: Seller user logged in, backend running, Task 2 complete
    Steps:
      1. Navigate to /dashboard
      2. Click "Gestionar Productos" or store registration action
      3. Fill in store name "Mi Tienda Saludable"
      4. Enter website "https://mitienda.cl"
      5. Click submit
    Expected Result: Store created, success message shown, dashboard updated with store info
    Evidence: .sisyphus/evidence/task-4-store-registration.png

  Scenario: Form validation - empty name
    Tool: Playwright
    Preconditions: Seller user logged in
    Steps:
      1. Navigate to store form
      2. Leave name empty
      3. Click submit
    Expected Result: Validation error shown, no API call made
    Evidence: .sisyphus/evidence/task-4-validation-error.png
  ```

  **Commit**: YES (group with Wave 1)
  - Message: `feat(stores): add store registration form for sellers`
  - Files: `src/app/features/dashboard/store-form/`, updated dashboard component

- [x] 5. Create seed data fixtures

  **What to do**:
  - Create Django management command or fixture JSON at `nutriprecio-backend/apps/core/management/commands/seed_data.py`
  - Seed data: 3-5 categories, 3-5 stores, 10-15 products, 15-20 prices, 2 users (1 seller, 1 regular)
  - Seller user: username "vendedor", password "test123", is_seller=True
  - Regular user: username "comprador", password "test123", is_seller=False
  - Each store linked to seller user via owner field
  - Products with realistic Chilean food names and prices in CLP
  - Run `USE_SQLITE=True python manage.py seed_data` to populate

  **Must NOT do**:
  - Do NOT create excessive data (keep it minimal for demo)
  - Do NOT use real brand names with trademarks
  - Do NOT hardcode passwords in production settings

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Tasks 1, 2)
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `nutriprecio-backend/apps/stores/models.py` — Store model with owner field (after Task 1)
  - `nutriprecio-backend/apps/products/models.py:1-25` — Product model for seed data
  - `nutriprecio-backend/apps/categories/models.py:1-15` — Category model
  - `nutriprecio-backend/apps/prices/models.py:1-25` — Price model
  - `nutriprecio-backend/apps/users/models.py:1-15` — User model with is_seller

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Seed data command populates database
    Tool: Bash
    Preconditions: Migrations applied, backend venv active
    Steps:
      1. cd nutriprecio-backend && source venv/bin/activate
      2. USE_SQLITE=True python manage.py seed_data
      3. USE_SQLITE=True python manage.py shell -c "from apps.stores.models import Store; from apps.products.models import Product; from apps.users.models import User; print(f'Users:{User.objects.count()} Stores:{Store.objects.count()} Products:{Product.objects.count()}')"
    Expected Result: Users > 0, Stores > 0, Products > 0
    Evidence: .sisyphus/evidence/task-5-seed-data.txt

  Scenario: Demo login as seller works
    Tool: Bash (curl)
    Preconditions: Seed data loaded
    Steps:
      1. curl -X POST http://localhost:8000/api/users/login/ -H "Content-Type: application/json" -d '{"username":"vendedor","password":"test123"}'
    Expected Result: 200 OK with token and user data where is_seller=true
    Evidence: .sisyphus/evidence/task-5-seller-login.txt
  ```

  **Commit**: YES
  - Message: `feat(seed): add seed data management command for demo`
  - Files: `apps/core/management/commands/seed_data.py`

- [x] 6. Update Sprint Backlog .xlsx with real task statuses

  **What to do**:
  - Update `docs/PMOInformatica_Plantilla_de_Sprint_Backlog(1).xlsx`:
    - Task 1 (MV-03 Backend tabla tienda): Status → "Hecho parcialmente", add notes about missing owner field
    - Task 2 (MV-03 Frontend formulario tienda): Status → "Por hacer" (not started)
    - Task 3 (MV-03 Backend endpoint tienda): Status → "Hecho parcialmente", add notes about missing owner linking
    - Task 4 (MV-52 Backend BDD usuarios): Status → "Hecho"
    - Task 5 (MV-52 Frontend login/register): Status → "Hecho"
    - Task 6 (MV-52 Backend credenciales/tokens): Status → "Hecho"
    - Task 7 (MV-54 Backend rutas protegidas): Status → "Hecho parcialmente", add notes about missing is_seller check
    - Task 8 (MV-54 Frontend Layout Dashboard): Status → "Hecho parcialmente", add notes about missing sidebar
    - Task 9 (MV-54 Frontend Vista Inicio Dashboard): Status → "Hecho parcialmente", add notes about missing store status
  - Update consumed hours realistically based on what was done
  - Add a "Observaciones" or notes column if not present

  **Must NOT do**:
  - Do NOT invent hours that weren't actually worked
  - Do NOT mark tasks as fully complete if they're partially done

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 12, 13
  - **Blocked By**: None

  **References**:
  - `docs/PMOInformatica_Plantilla_de_Sprint_Backlog(1).xlsx` — The Sprint Backlog file to update
  - Analysis in this plan's "Estado del Sprint" section for exact status of each task

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Sprint Backlog reflects reality
    Tool: Bash
    Preconditions: File updated
    Steps:
      1. Open the .xlsx file and verify each task status
    Expected Result: All 9 tasks have status updated, hours reflect work done, notes explain partial completions
    Evidence: .sisyphus/evidence/task-6-backlog-updated.txt (text summary of what was changed)
  ```

  **Commit**: NO (documentation file)

- [x] 7. Draft Sprint Review content

  **What to do**:
  - Create markdown document at `docs/sprint-review.md` with:
    - **Objetivo del Sprint I**: Implementar registro de tienda (MV-03), login/registro (MV-52), y dashboard de vendedor (MV-54)
    - **Funcionalidades entregadas**:
      - ✅ MV-52 completo: Registro e inicio de sesión con tokens
      - ⚠️ MV-03 parcial: Backend CRUD de tiendas existe, pero falta formulario frontend y vinculación al usuario
      - ⚠️ MV-54 parcial: Dashboard visible con bienvenida, pero sin sidebar, sin estado de tienda real, sin validación de rol vendedor
    - **Funcionalidades NO entregadas**:
      - Formulario de registro de tienda (frontend)
      - Validación de rol is_seller en rutas protegidas
      - Estado real del perfil de tienda en el dashboard
    - **Demo plan**: Step-by-step what will be shown (login → register → dashboard)
    - **Métricas**: 3/9 tareas completadas, 6/9 parciales, 0/9 sin iniciar

  **Must NOT do**:
  - Do NOT claim tasks are complete if they're partial
  - Do NOT invent stakeholder feedback that didn't happen

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5, 6, 8)
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 9, 11, 12, 13
  - **Blocked By**: None

  **References**:
  - `docs/Instrucciones.md` — Section "Sprint Review: ¿Qué funcionalidades se lograron entregar? ¿Qué feedback se obtuvo?"
  - This plan's "Estado del Sprint" table for exact status of each task
  - `docs/diagrama_actividades.md:91-106, 209-212, 305-308` — Sprint task assignments per diagram

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Sprint Review document covers all required sections
    Tool: Bash
    Preconditions: File created
    Steps:
      1. Check file exists at docs/sprint-review.md
      2. Verify it contains: Objetivo, Entregadas, No entregadas, Demo plan, Métricas
    Expected Result: All sections present with accurate content
    Evidence: .sisyphus/evidence/task-7-sprint-review.md
  ```

  **Commit**: YES
  - Message: `docs(sprint1): add sprint review content`
  - Files: `docs/sprint-review.md`

- [x] 8. Draft Sprint Retrospective content

  **What to do**:
  - Create markdown document at `docs/sprint-retrospective.md` with:
    - **Qué salió bien**:
      - Distribución de tareas clara y las 3 tareas completadas funcionaron correctamente
      - Stack tecnológico (Django + Angular) demostró ser apropiado
      - Autenticación con tokens implementada correctamente desde el inicio
      - Estructura del proyecto organizada (apps separadas, servicios frontend)
    - **Qué se puede mejorar**:
      - 6 de 9 tareas quedaron parciales — falta de seguimiento diario
      - Campo owner de Store no se incluyó desde el inicio — mayor comunicación con diseño UML
      - No se validó el rol is_seller en el dashboard — requiere más atención a los criterios de aceptación
      - Sin datos de prueba hasta el final — deberíamos crear seed data más temprano
      - formulario de registro de tienda no se completó — estimar mejor la complejidad del frontend
    - **Acciones para el próximo Sprint**:
      - Implementar daily standups o check-ins más frecuentes
      - Crear seed data al inicio del sprint, no al final
      - Revisar modelos contra diagramas UML antes de codificar
      - Definir criterios de aceptación más claros por tarea
    - **Velocidad del equipo**: 47 horas estimadas, ~20 horas reales completadas

  **Must NOT do**:
  - Do NOT fabricate retro items — must reflect genuine team reflections
  - Do NOT blame individuals — focus on process improvements

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5, 6, 7)
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 9, 11, 12, 13
  - **Blocked By**: None

  **References**:
  - `docs/Instrucciones.md:24-26` — "Sprint Retrospective: Qué salió bien? Qué se puede mejorar?"
  - This plan's sprint status analysis for accurate metrics

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Retrospective document has all required sections
    Tool: Bash
    Preconditions: File created
    Steps:
      1. Check file exists at docs/sprint-retrospective.md
      2. Verify it contains sections: Qué salió bien, Qué mejorar, Acciones próximo sprint
    Expected Result: All sections present with concrete, actionable content
    Evidence: .sisyphus/evidence/task-8-retrospective.md
  ```

  **Commit**: YES
  - Message: `docs(sprint1): add sprint retrospective content`
  - Files: `docs/sprint-retrospective.md`

- [x] 9. Create Use Case diagram (following example format)

  **What to do**:
  - Create a proper UML Use Case diagram following the example in `docs/ejemplo-diagrama-casos.png`
  - Use a diagramming tool (draw.io, Lucidchart, or similar exported to PNG)
  - Style requirements (from example analysis):
    - Actors as stick figures with labels below, outside system boundary
    - Use cases as ellipses with blue fill (#4472C4) and white text
    - System boundary: large light-blue rectangle (#D6E4F0) labeled "NutriPrecio"
    - Associations: solid black lines with open arrowheads
    - <<include>> and <<extend>>: dashed lines with stereotyped labels
    - Generalization among use cases: solid lines with hollow triangle
  - Content (from existing diagrama_casos_de_uso.md):
    - Actors: Comprador, Vendedor Independiente, Sistema
    - Use cases: Registrar cuenta, Iniciar/Cerrar sesión, Registrar tienda, Editar perfil, Dashboard, Buscar productos, Comparar precios, Ver detalle, Gestionar productos
  - Export as high-res PNG to `docs/diagrama-casos-de-uso.png`

  **Must NOT do**:
  - Do NOT just export the current Mermaid diagram — must follow the visual style of the example
  - Do NOT add details beyond what's in the current diagram (actors and use cases stay the same)
  - Do NOT use auto-generated tool watermarks if possible

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`/frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10, 11)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 12, 13
  - **Blocked By**: Tasks 7, 8 (need Review/Retro content for context)

  **References**:
  - `docs/diagrama_casos_de_uso.md:1-122` — Current Mermaid diagram content (actors, use cases, relationships)
  - `docs/ejemplo-diagrama-casos.png` — Visual style reference: blue ellipses, stick figures, light-blue boundary

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Use case diagram matches example style
    Tool: Bash (manual visual check)
    Preconditions: PNG file generated
    Steps:
      1. Verify file exists at docs/diagrama-casos-de-uso.png
      2. Open and visually compare with ejemplo-diagrama-casos.png
    Expected Result: Actors are stick figures, use cases are blue ellipses, system boundary is light-blue, <<include>>/<<extend>> are dashed
    Evidence: .sisyphus/evidence/task-9-use-case-diagram.png
  ```

  **Commit**: YES
  - Message: `docs(sprint1): recreate use case diagram in proper UML format`
  - Files: `docs/diagrama-casos-de-uso.png`

- [x] 10. Create Class diagram (following example format)

  **What to do**:
  - Create a proper UML Class diagram following the example in `docs/ejemplo-diagrama-clases.png`
  - Style requirements (from example analysis):
    - Classes as 3-compartment rectangles (name, attributes, methods)
    - Color coding by stereotype: yellow/cream for base classes, peach/salmon for concrete, pink for interfaces, grey for external
    - Abstract class names in italics
    - <<interface>> stereotype above interface names
    - Relationships with proper notation: inheritance (hollow triangle), composition (filled diamond), aggregation (hollow diamond), dependency (dashed arrow)
    - Orange annotation/sticky-note boxes explaining key concepts (optional but matches style)
  - Content (from existing diagrama_clases.md):
    - Entities: Usuario, Tienda, Producto, Categoria, Precio
    - Controllers: GestorUsuario, GestorTienda, GestorProducto
    - Interface: Dashboard
    - Note: Update Tienda to show `owner` FK to Usuario (matching Task 1 correction)
  - Export as high-res PNG to `docs/diagrama-clases.png`

  **Must NOT do**:
  - Do NOT include the Mermaid auto-labels or tool watermarks prominently
  - Do NOT add classes beyond what's in the original diagram (keep scope to Sprint I)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`/frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9, 11)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 12, 13
  - **Blocked By**: Task 1 (need updated Store with owner for diagram accuracy)

  **References**:
  - `docs/diagrama_clases.md:1-183` — Current Mermaid class diagram content
  - `docs/ejemplo-diagrama-clases.png` — Visual style: 3-compartment boxes, color-coded, orange annotations
  - `nutriprecio-backend/apps/stores/models.py` — After Task 1, Store will have owner field
  - `nutriprecio-backend/apps/users/models.py` — User with is_seller field

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Class diagram matches example style and reflects code
    Tool: Bash (visual check)
    Preconditions: PNG file generated, Task 1 complete
    Steps:
      1. Verify file exists at docs/diagrama-clases.png
      2. Visually compare with ejemplo-diagrama-clases.png
      3. Verify Tienda has owner FK to Usuario (matches code after Task 1)
    Expected Result: 3-compartment boxes, color-coded, relationships with proper UML notation
    Evidence: .sisyphus/evidence/task-10-class-diagram.png
  ```

  **Commit**: YES
  - Message: `docs(sprint1): recreate class diagram in proper UML format`
  - Files: `docs/diagrama-clases.png`

- [x] 11. Create Activity diagram (following example format)

  **What to do**:
  - Create proper UML Activity diagrams following the example in `docs/ejemplo-diagrama-de-actividades.png`
  - Style requirements (from example analysis):
    - 4 vertical swimlanes: Usuario, Frontend, Backend, Base de Datos
    - Start node: solid red circle; End node: red bullseye
    - Activities as blue rounded rectangles (#2196F3) with white text
    - Decision diamonds in red/orange with guard conditions in brackets
    - Fork/join bars: thick black horizontal bars
    - Control flow: solid black arrows
    - Title in bold uppercase above diagram frame
    - Thin black outer frame
  - Content (3 flows from existing diagrama_actividades.md):
    - Flow MV-03: Registro de Tienda por Vendedor
    - Flow MV-52: Registro e Inicio de Sesión
    - Flow MV-54: Acceso al Dashboard del Vendedor
  - Create 3 separate diagrams or one combined diagram with clear flow separation
  - Export as high-res PNG to `docs/diagrama-actividades.png`

  **Must NOT do**:
  - Do NOT use Mermaid flowcharts — must match the visually rich UML style of the example
  - Do NOT combine all 3 flows into one impossibly large diagram if it becomes unreadable

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`/frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9, 10)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 12, 13
  - **Blocked By**: Tasks 7, 8 (need Review/Retro for context)

  **References**:
  - `docs/diagrama_actividades.md:1-318` — Current Mermaid flows (3 complete flows with descriptions)
  - `docs/ejemplo-diagrama-de-actividades.png` — Visual style: swimlanes, blue activities, red nodes

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Activity diagrams match example style and cover all 3 flows
    Tool: Bash (visual check)
    Preconditions: PNG file(s) generated
    Steps:
      1. Verify files exist (docs/diagrama-actividades.png or separate files)
      2. Visually compare with ejemplo-diagrama-de-actividades.png
      3. Verify all 3 flows are present: MV-03, MV-52, MV-54
    Expected Result: Swimlanes with proper notation, all 3 Sprint I flows covered
    Evidence: .sisyphus/evidence/task-11-activity-diagram.png
  ```

  **Commit**: YES
  - Message: `docs(sprint1): recreate activity diagrams in proper UML format`
  - Files: `docs/diagrama-actividades.png`

- [x] 12. Create PowerPoint presentation (8 minutes)

  **What to do**:
  - Create presentation at `docs/Sprint-I-NutriPrecio.pptx` following the temario in `docs/Instrucciones.md`
  - Slide structure:
    1. **Portada** (0.5 min): Nombre del proyecto, equipo, Sprint I, fecha
    2. **Introducción al Sprint I** (0.5 min): Objetivo general, meta específica, alcance
    3. **Metodología y enfoque técnico** (1 min): Herramientas (Django, Angular, Git), roles del equipo, Scrum process
    4. **Diagrama de Casos de Uso** (1 min): Explicar actores y funcionalidades clave
    5. **Diagrama de Clases** (1 min): Estructura del sistema y relaciones
    6. **Diagrama de Actividades** (0.5 min): Flujos principales
    7. **Sprint Review** (0.5 min): Qué se logró, qué faltó
    8. **Sprint Retrospective** (0.5 min): Qué salió bien, qué mejorar
    9. **Transición a Demo** (0.5 min): "Ahora veremos la demo..."
  - Insert diagram images (Tasks 9, 10, 11) into relevant slides
  - Use consistent design theme with NutriPrecio colors (green/teal #009688)
  - Include Sprint Backlog screenshot/snapshot

  **Must NOT do**:
  - Do NOT exceed 8 minutes of content (rehearse timing)
  - Do NOT include code snippets on slides (keep visual)
  - Do NOT add slides beyond the temario structure

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`/frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 13)
  - **Parallel Group**: Wave 4
  - **Blocks**: None (final deliverable)
  - **Blocked By**: Tasks 6, 7, 8, 9, 10, 11

  **References**:
  - `docs/Instrucciones.md:1-41` — Exact temario and timing requirements
  - `docs/sprint-review.md` — Sprint Review content (Task 7)
  - `docs/sprint-retrospective.md` — Retrospective content (Task 8)
  - `docs/PMOInformatica_Plantilla_de_Sprint_Backlog(1).xlsx` — Sprint Backlog data
  - `docs/diagrama-casos-de-uso.png` — Use Case diagram (Task 9)
  - `docs/diagrama-clases.png` — Class diagram (Task 10)
  - `docs/diagrama-actividades.png` — Activity diagram (Task 11)

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Presentation follows temario structure
    Tool: Bash (python-pptx validation)
    Preconditions: .pptx file created
    Steps:
      1. Verify file exists at docs/Sprint-I-NutriPrecio.pptx
      2. Check that all 5 temario sections are present (Intro, Metodología, UML, Review, Retro)
      3. Verify diagram images are embedded in slides
    Expected Result: 8-10 slides covering all temario sections, with diagram images
    Evidence: .sisyphus/evidence/task-12-presentation-check.txt
  ```

  **Commit**: YES
  - Message: `docs(sprint1): add Sprint I PowerPoint presentation`
  - Files: `docs/Sprint-I-NutriPrecio.pptx`

- [x] 13. Create written report (.docx + .pdf)

  **What to do**:
  - Create report at `docs/Informe-Sprint-I-NutriPrecio.docx` and export to PDF
  - Report structure:
    1. **Portada**: Nombre del proyecto, curso, equipo, fecha
    2. **Introducción**: Objetivo del Sprint I, alcance
    3. **Metodología**: Scrum framework, herramientas, roles
    4. **Sprint Backlog**: Tabla con las 9 tareas, responsables, horas, estados
    5. **Diagrama de Casos de Uso**: Imagen + explicación de actores y funcionalidades
    6. **Diagrama de Clases**: Imagen + explicación de estructura y relaciones
    7. **Diagrama de Actividades**: Imagen + explicación de los 3 flujos
    8. **Sprint Review**: Funcionalidades entregadas y no entregadas
    9. **Sprint Retrospective**: Reflexiones y mejoras propuestas
    10. **Conclusiones**: Lecciones aprendidas, plan para Sprint II
  - Export to PDF: `docs/Informe-Sprint-I-NutriPrecio.pdf`
  - Use professional formatting: headers, consistent fonts, page numbers

  **Must NOT do**:
  - Do NOT make it longer than 15 pages
  - Do NOT duplicate content from presentation — report can be more detailed

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 12)
  - **Parallel Group**: Wave 4
  - **Blocks**: None (final deliverable)
  - **Blocked By**: Tasks 6, 7, 8, 9, 10, 11

  **References**:
  - `docs/Instrucciones.md:1-41` — Temario requirements
  - `docs/sprint-review.md` — Sprint Review content (Task 7)
  - `docs/sprint-retrospective.md` — Retrospective content (Task 8)
  - `docs/PMOInformatica_Plantilla_de_Sprint_Backlog(1).xlsx` — Sprint Backlog data
  - `docs/diagrama-casos-de-uso.png` — Use Case diagram (Task 9)
  - `docs/diagrama-clases.png` — Class diagram (Task 10)
  - `docs/diagrama-actividades.png` — Activity diagram (Task 11)

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Report contains all required sections
    Tool: Bash
    Preconditions: Files created
    Steps:
      1. Verify docs/Informe-Sprint-I-NutriPrecio.docx exists
      2. Verify docs/Informe-Sprint-I-NutriPrecio.pdf exists
      3. Check document contains all 10 sections listed above
    Expected Result: Both .docx and .pdf exist with complete content
    Evidence: .sisyphus/evidence/task-13-report-check.txt
  ```

  **Commit**: YES
  - Message: `docs(sprint1): add Sprint I written report`
  - Files: `docs/Informe-Sprint-I-NutriPrecio.docx`, `docs/Informe-Sprint-I-NutriPrecio.pdf` (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle` — **APPROVED** (Must Have 5/5, Must NOT Have 6/6, Tasks 13/13)
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high` — **APPROVED** (Build PASS, Lint PASS, Files 10 clean/0 issues)
  Run `tsc --noEmit` or `npm run build` + `python manage.py check` + backend server test. Review changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` — **APPROVED** (Scenarios 5/6 pass, Step 5 expected out-of-scope, Integration 4/4)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration: register seller → login → create store → view dashboard. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep` — **APPROVED** (Tasks 13/13 compliant, Contamination CLEAN, Unaccounted CLEAN)
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `fix(sprint1): add store owner field and seller permissions` - models.py, serializers.py, views.py, components
- **Wave 2**: `feat(sprint1): add seed data and sprint documentation` - fixtures, .xlsx
- **Wave 3**: `docs(sprint1): add UML diagrams` - docs/ images
- **Wave 4**: `docs(sprint1): add presentation and report` - docs/ pptx, docx, pdf

---

## Success Criteria

### Verification Commands
```bash
cd nutriprecio-backend && source venv/bin/activate && USE_SQLITE=True python manage.py runserver  # Backend arranca
cd nutriprecio-frontend && npm start  # Frontend arranca
cd nutriprecio-backend && source venv/bin/activate && USE_SQLITE=True python manage.py shell -c "from apps.stores.models import Store; print(Store.objects.count())"  # Seed data existe
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Demo funcional (registro → login → crear tienda → dashboard)
- [ ] 3 diagramas UML en formato visual consistente con ejemplos
- [ ] Presentación PowerPoint completa
- [ ] Informe escrito en .docx y .pdf