# Sprint Retrospective — Sprint I

## Qué Salió Bien

- **Distribución clara de tareas**: Cada integrante del equipo tuvo responsabilidades bien definidas desde el inicio del Sprint. Vicente se enfocó en el backend (modelos, permisos), Benjamín en el frontend (formularios, dashboard), Matías en endpoints API, Fernando en interfaces de autenticación, y Sebastián en la vista del dashboard.

- **Stack tecnológico apropiado**: Django + Django REST Framework para el backend y Angular 19 para el frontend demostraron ser una combinación sólida. La separación de concerns entre apps de Django y componentes standalone de Angular facilitó el desarrollo paralelo.

- **Autenticación implementada correctamente desde el inicio**: El sistema de tokens de Django REST Framework se configuró correctamente desde el primer día, incluyendo el interceptor HTTP en Angular que automáticamente incluye el token en cada request.

- **Estructura del proyecto organizada**: Las apps de Django separadas por dominio (users, stores, products, prices, categories) y la estructura de carpetas del frontend (core/services, features, shared/components) permitieron que múltiples desarrolladores trabajaran sin conflictos.

## Qué Se Puede Mejorar

- **6 de 9 tareas quedaron parciales o incompletas**: Falta de seguimiento diario y check-ins frecuentes. El equipo no tuvo standups diarios formales, lo que resultó en tareas que se estancaron sin que nadie lo notara a tiempo.

- **Campo owner de Store no se incluyó desde el inicio**: El modelo Store se creó sin el campo owner (ForeignKey a User), lo que contradecía el diagrama de clases. Esto requirió una migración adicional y ajustes en el serializer y viewset. Mayor comunicación entre el diseño UML y la implementación hubiera prevenido esto.

- **No se validó el rol is_seller en el dashboard inicialmente**: El authGuard solo verificaba si el usuario estaba autenticado, no si era vendedor. Esto permitió que usuarios compradores accedieran al dashboard. Los criterios de aceptación debieron ser más específicos.

- **Sin datos de prueba hasta el final**: La base de datos estuvo vacía durante todo el Sprint. No se creó seed data hasta el último momento, lo que imposibilitó hacer demos intermedias y pruebas reales de integración.

- **Formulario de registro de tienda subestimado**: La tarea de crear el formulario frontend tomó más tiempo del estimado porque requirió integración con el backend (FormData para file upload), manejo de errores, y navegación. La estimación de 5 horas fue insuficiente.

## Acciones para el Próximo Sprint

1. **Implementar daily standups**: Reuniones diarias de 15 minutos para reportar progreso, bloqueos, y plan del día.

2. **Crear seed data al inicio del Sprint**: Tener datos de prueba desde el día 1 para permitir demos y pruebas continuas.

3. **Revisar modelos contra diagramas UML antes de codificar**: Validar que los modelos Django reflejen exactamente lo diseñado en los diagramas de clases.

4. **Definir criterios de aceptación más claros por tarea**: Cada tarea debe tener criterios de aceptación específicos y verificables antes de comenzar.

5. **Estimar con más margen para tareas de integración**: Las tareas que involucran frontend + backend deben tener estimaciones más conservadoras.

## Velocidad del Equipo

| Métrica | Valor |
|---------|-------|
| Horas estimadas | 47 horas |
| Horas completadas | ~35 horas (74%) |
| Tareas completadas | 7 de 9 (78%) |
| Tareas parciales | 2 de 9 (22%) |
| Deuda técnica | Dashboard sin sidebar, estado de tienda no integrado, gestión de productos pendiente |
