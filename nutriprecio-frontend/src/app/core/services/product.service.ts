import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: number;
  category_name: string;
  unit: string;
  image: string;
  description: string;
  barcode: string;
  latest_price: {
    price: number;
    original_price: number;
    discount_percentage: number;
    store: string;
    in_stock: boolean;
  } | null;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = inject(ApiService);

  getProducts(params?: { search?: string; category?: number; brand?: string; page?: number }) {
    return this.api.get<ProductListResponse>('/products/', params);
  }

  getProduct(slug: string) {
    return this.api.get<Product>(`/products/${slug}/`);
  }

  searchProducts(query: string) {
    return this.api.get<Product[]>('/products/search/', { q: query });
  }
}
