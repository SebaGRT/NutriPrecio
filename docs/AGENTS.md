# Guide for AI Agents

This document provides guidance for AI agents working on the NutriPrecio project.

---

## Project Context

- **Goal**: Build a price comparison website for healthy food in Chile
- **Users**: Chilean consumers looking for the best prices on groceries
- **Scope**: Chile only, fresh food and groceries

---

## Important Conventions

### Python/Django
- **Line length**: 100 characters max
- **Indentation**: 4 spaces
- **Naming**: 
  - Models: `PascalCase` (e.g., `Product`)
  - Functions: `snake_case` (e.g., `get_products`)
  - Constants: `UPPER_SNAKE_CASE`
- **Imports**: Group by standard library, third-party, then local apps
- **Models**: Always add `__str__` method
- **API**: Use DRF ViewSets and serializers

### TypeScript/Angular
- **Line length**: 100 characters max
- **Indentation**: 2 spaces
- **Components**: Use standalone components (Angular 17+)
- **Services**: Use `inject()` instead of constructor injection
- **HTTP**: Use `HttpClient` with typed responses
- **State**: Use RxJS services (not NgRx for simplicity)

### Git
- **Branch naming**: `feature/description` or `fix/description`
- **Commits**: Use imperative mood ("Add feature" not "Added feature")
- **PRs**: Include summary of changes

---

## File Structure Reference

### Backend Key Files
```
nutriprecio-backend/
├── apps/<app>/models.py      # Database models
├── apps/<app>/serializers.py # DRF serializers
├── apps/<app>/views.py       # API views
├── apps/<app>/urls.py        # URL routing
└── nutriprecio/settings.py   # Django settings
```

### Frontend Key Files
```
nutriprecio-frontend/src/
├── app/core/services/        # API, Auth, Product services
├── app/shared/components/    # Reusable UI components
├── app/features/             # Page components
├── app/app.routes.ts         # Application routing
└── environments/environment.ts # API URL config
```

---

## Common Patterns

### Adding a New Model (Backend)
```python
# 1. apps/products/models.py
class MyModel(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name

# 2. apps/products/serializers.py
class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = ['id', 'name', 'slug']

# 3. apps/products/views.py
class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

# 4. apps/products/urls.py
router.register('', MyModelViewSet)

# 5. Run migrations
USE_SQLITE=True python manage.py makemigrations
USE_SQLITE=True python manage.py migrate
```

### Adding a New Service (Frontend)
```typescript
// src/app/core/services/my-service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

export interface MyData {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class MyService {
  private api = inject(ApiService);
  
  getData() {
    return this.api.get<MyData[]>('/endpoint/');
  }
}
```

### Adding a New Page
```typescript
// 1. Create component at app/features/new-page/
// 2. Update app.routes.ts
{
  path: 'new-page',
  loadComponent: () => 
    import('./features/new-page/new-page.component')
    .then(m => m.NewPageComponent),
}
```

---

## Testing the API

```bash
# Start server
cd nutriprecio-backend
source venv/bin/activate
USE_SQLITE=True python manage.py runserver

# Test endpoints
curl http://localhost:8000/api/products/
curl http://localhost:8000/api/stores/
curl http://localhost:8000/api/categories/
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Import errors | Check PYTHONPATH includes project root |
| Database errors | Run migrations: `python manage.py migrate` |
| CORS errors | Set `DEBUG=True` in settings |
| Angular build fails | Delete node_modules and reinstall |
| Service not found | Check service is in `providedIn: 'root'` |

---

## Getting Help

1. Check existing code patterns in the project
2. Review Django REST Framework docs
3. Review Angular docs
4. Check `/docs/` directory for project docs
