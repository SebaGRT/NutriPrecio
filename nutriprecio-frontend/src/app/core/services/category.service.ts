import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  image: string;
  children: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api = inject(ApiService);

  getCategories() {
    return this.api.get<Category[]>('/categories/');
  }

  getCategory(slug: string) {
    return this.api.get<Category>(`/categories/${slug}/`);
  }
}
