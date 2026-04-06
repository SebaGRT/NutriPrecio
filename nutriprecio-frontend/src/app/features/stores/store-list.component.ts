import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreService, Store, StoreListResponse } from '../../core/services/store.service';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="store-list-container">
      <h1>Tiendas</h1>
      <p class="subtitle">Explora los supermarkets y tiendas disponibles</p>
      
      <div class="store-grid">
        @for (store of stores; track store.id) {
          <mat-card class="store-card" [routerLink]="['/stores', store.slug]">
            <img mat-card-image [src]="store.logo || 'assets/no-store.png'" [alt]="store.name" class="store-logo">
            <mat-card-content>
              <h3>{{ store.name }}</h3>
              <a [href]="store.website" target="_blank" *ngIf="store.website" (click)="$event.stopPropagation()">
                Visitar sitio
              </a>
            </mat-card-content>
          </mat-card>
        } @empty {
          <p class="no-results">No hay tiendas disponibles</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .store-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .store-list-container h1 {
      margin: 0 0 8px 0;
    }
    .subtitle {
      color: #666;
      margin: 0 0 24px 0;
    }
    .store-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .store-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .store-card:hover {
      transform: translateY(-4px);
    }
    .store-logo {
      height: 150px;
      object-fit: contain;
      padding: 20px;
    }
    .store-card h3 {
      margin: 0 0 8px 0;
    }
    .store-card a {
      color: #009688;
      text-decoration: none;
    }
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class StoreListComponent implements OnInit {
  private storeService = inject(StoreService);

  stores: Store[] = [];

  ngOnInit() {
    this.storeService.getStores().subscribe({
      next: (data: StoreListResponse) => this.stores = data.results,
      error: () => this.stores = []
    });
  }
}
