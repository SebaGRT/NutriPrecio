# Learnings

- Django 6.0 places new migrations as `0002` even if the instructions say `0003` — this is normal as there were only 2 existing migration files after `0001_initial.py`.
- `USE_SQLITE=True` env var is required for all manage.py commands.
- `python manage.py check` passes cleanly; no issues detected.
- `ForeignKey` with `null=True, blank=True` generates the correct nullable FK column at DB level, using `settings.AUTH_USER_MODEL` (string reference) which avoids circular import issues.
- The `User` model lives in `apps/users/models.py` and extends `AbstractUser`.
- Angular 19 standalone components use `inject()` for DI; template-driven forms with `ngModel` are the existing pattern in this codebase.
- For file uploads in Angular, build a `FormData` object and post directly via `HttpClient` rather than the generic `ApiService`, because `ApiService.post` sends JSON and does not support `FormData` without header changes.
- The `environment.apiUrl` already includes `/api`, so endpoints like `/stores/` resolve correctly.
- `authGuard` checks `isLoggedIn()` and `is_seller`; reusing it on `dashboard/store-form` ensures only sellers access the registration form.
- Dashboard quick action cards use an overlay button pattern; swapping `disabled` for an enabled `(click)` handler navigates cleanly without layout changes.
- `npm run build` passes with zero compilation errors; the only warning is an initial bundle budget exceeded, which is pre-existing.
- `StoreSerializer` now includes `owner` as a read-only field (added to both `fields` and `read_only_fields`).
- `StoreViewSet` overrides `perform_create` to set `owner=self.request.user`.
- `StoreViewSet.get_queryset` returns seller-specific stores for sellers, or all active stores for anonymous/non-seller users.
- `StoreViewSet.get_permissions` enforces `[IsAuthenticated, IsSeller]` for write actions (create, update, delete) and `[IsAuthenticatedOrReadOnly]` for read actions (list, retrieve).
- Virtual environment is at `nutriprecio-backend/.venv/` — must be sourced before running manage.py commands.
- Management commands live in `apps/core/management/commands/` directory (must create `management/__init__.py` and `management/commands/__init__.py`).
- `seed_data` command creates 2 users, 3 categories, 3 stores, 10 products, 15 prices for demo purposes.
- Use `get_or_create` in seed commands for idempotency — re-running doesn't create duplicates.
- Use `set_password()` + `save()` for user passwords in seed data (not passed to `create_user` as it would be stored in plaintext via `defaults`).
- `USE_SQLITE=True` is required for all manage.py commands in this project.
- Price model has `unique_together = ['product', 'store', 'recorded_at']` — for `get_or_create` to work without a timestamp, use a condition like `recorded_at__isnull=False` since we can't match `auto_now_add` fields exactly.
- Sprint retrospective document created at `docs/sprint-retrospective.md` with 4 sections: Qué Salió Bien (4 items), Qué Se Puede Mejorar (5 items), Acciones para el Próximo Sprint (5 actions), Velocidad del Equipo (metrics table).
- Team velocity: 47h estimated, ~35h completed (74%), 7/9 tasks done (78%), 2/9 partial (22%).
- Key retrospective themes: lack of daily standups, UML-code misalignment, missing seed data, underestimated integration tasks, unclear acceptance criteria.
- Sprint review document created at `docs/sprint-review.md` with sections: Objetivo, Funcionalidades Entregadas (MV-52, MV-03, MV-54 all marked COMPLETO based on actual code state), Funcionalidades NO Entregadas/Parciales (sidebar, real store status, product management), Plan de Demostracion (6 steps with URLs), Metricas (7/9 = 78%, 35/47h = 74%), Feedback (none formal), Equipo table.
- Actual code state confirms: Store model has `owner` FK, store-form component exists at `dashboard/store-form/`, authGuard checks `is_seller`, dashboard has welcome message + profile + quick actions with navigation to store-form.

## Sprint Backlog Update (2026-05-10)
- Sprint Backlog Excel updated with real implementation statuses for all 9 tasks.
- 7 of 9 tasks marked "Hecho" (fully complete).
- 2 tasks marked "Hecho parcialmente": Task 8 (Dashboard Layout, no sidebar) and Task 9 (Welcome view works, store status pending).
- Total consumed hours: 21h out of 47h estimated (~45% burn rate).
- Notes added in column S for partial completion tasks explaining what is missing.
- `openpyxl` handles `.xlsx` files with formulas well; remaining columns use `=G-H` pattern which auto-recalculate when consumed values change.

## UML Diagram Generation (2026-05-10)
- PIL (Pillow) with DejaVu Sans fonts works well for programmatic UML diagrams in Python.
- Use Case diagram: light-blue boundary (#D6E4F0), blue ellipses (#4472C4), stick figures, dashed arrows for <<include>>/<<extend>>.
- Class diagram: 3-compartment rectangles, color-coded (yellow/cream entities, peach controllers, pink interfaces, grey external), hollow triangle for inheritance.
- Activity diagram: 4 swimlanes (Usuario, Frontend, Backend, Base de Datos), red start/end nodes, blue rounded activities (#2196F3), orange decision diamonds.
- Activity diagram with 3 full flows is very tall (~8600px); sequential node layout with cross-lane connectors is sufficient for readability.
- When drawing class boxes, always calculate heights first to avoid overlaps between boxes placed at fixed Y coordinates.
- `draw.textbbox` is the reliable way to measure text dimensions in modern Pillow.
- System font path: `/usr/share/fonts/TTF/DejaVuSans.ttf` is available on this Linux environment.

## PowerPoint Generation (2026-05-10)
- python-pptx `RGBColor` is imported from `pptx.dml.color` (not `RgbColor`).
- 16:9 slide size in python-pptx: `slide_width = Inches(13.333)`, `slide_height = Inches(7.5)`.
- Use `slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, width, height)` for full-slide colored backgrounds.
- To send a shape to the back: remove its element from `_spTree` and re-insert at index 2 (after `spTree` and `nvGrpSpPr`).
- Embed images with `slide.shapes.add_picture(img_path, left, top, width=...)`. Large diagrams fit well at ~7.5in width with explanatory bullets on the right.
- Use `slide_layouts[6]` (blank layout) for fully custom slides; this avoids fighting the default title/content placeholders.
- LibreOffice headless conversion (`--headless --convert-to pdf`) is a reliable way to verify .pptx validity without a GUI.
- A 9-slide presentation with 3 embedded PNG diagrams results in ~400KB file size.
- Consistent visual identity: teal accent bars top/bottom, left margin accent strip on title slide, colored section headers.

## Sprint I Report Generation (2026-05-11)
- python-docx and reportlab both available and working for report generation.
- DOCX: 136 paragraphs, 2 tables (roles + sprint backlog), 3 embedded diagram images.
- PDF: 11 pages, 621 KB, valid PDF header.
- Report sections: Portada, Introduccion, Metodologia, Sprint Backlog, Diagrama Casos de Uso, Diagrama Clases, Diagrama Actividades, Sprint Review, Sprint Retrospective, Conclusiones.
- Diagram image sizes: casos-de-uso (1600x1200), clases (1800x1500), actividades (2200x8630). Activity diagram required height capping for PDF.
- `white` from reportlab.lib.colors is incompatible with docx RGBColor; must use RGBColor(0xFF, 0xFF, 0xFF) for docx and `white` for reportlab.
- Tables in docx don't have paragraph_format attribute; use doc.add_paragraph() for spacing.
- Sprint Backlog data: 9 tasks, 47h estimated, 19h consumed, 7 Hecho, 2 Hecho parcialmente.
- Report stays under 15-page limit (11 pages).
