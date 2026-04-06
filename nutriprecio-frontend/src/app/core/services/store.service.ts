import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

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

  getStores() {
    return this.api.get<StoreListResponse>('/stores/');
  }

  getStore(slug: string) {
    return this.api.get<Store>(`/stores/${slug}/`);
  }
}
