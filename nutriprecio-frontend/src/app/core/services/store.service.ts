import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

export interface Store {
  id: number;
  name: string;
  slug: string;
  logo: string;
  website: string;
  is_active: boolean;
}

export interface StoreListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Store[];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private api = inject(ApiService);
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getStores() {
    return this.api.get<StoreListResponse>('/stores/');
  }

  getStore(slug: string) {
    return this.api.get<Store>(`/stores/${slug}/`);
  }

  createStore(data: { name: string; logo?: File; website?: string }) {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.logo) {
      formData.append('logo', data.logo);
    }
    if (data.website) {
      formData.append('website', data.website);
    }
    return this.http.post(`${this.baseUrl}/stores/`, formData);
  }
}
