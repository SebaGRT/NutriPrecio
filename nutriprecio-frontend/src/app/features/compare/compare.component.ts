import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProductService, Product } from '../../core/services/product.service';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  template: `
    <div class="compare-container">
      <h1>Comparar precios</h1>
      <p class="subtitle">Encuentra el mejor precio para un producto</p>

      <div class="search-section">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Buscar producto</mat-label>
          <input matInput [(ngModel)]="searchQuery" placeholder="Escribe el nombre del producto...">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="search()">Buscar</button>
      </div>

      @if (searchResults.length > 0) {
        <div class="search-results">
          <h3>Selecciona un producto:</h3>
          <div class="product-list">
            @for (product of searchResults; track product.id) {
              <mat-card class="product-item" (click)="selectProduct(product)">
                <img [src]="product.image || 'assets/no-image.png'" [alt]="product.name">
                <div class="product-info">
                  <h4>{{ product.name }}</h4>
                  <p>{{ product.brand }}</p>
                </div>
              </mat-card>
            }
          </div>
        </div>
      }

      @if (selectedProduct) {
        <div class="comparison-results">
          <h2>Precios para: {{ selectedProduct.name }}</h2>
          <p class="no-prices">Próximamente: historial de precios por tienda...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .compare-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    .compare-container h1 {
      margin: 0 0 8px 0;
    }
    .subtitle {
      color: #666;
      margin: 0 0 24px 0;
    }
    .search-section {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    .search-field {
      flex: 1;
    }
    .search-results {
      margin-bottom: 24px;
    }
    .search-results h3 {
      margin: 0 0 16px 0;
    }
    .product-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .product-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .product-item:hover {
      background: #f5f5f5;
    }
    .product-item img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
    .product-info h4 {
      margin: 0 0 4px 0;
    }
    .product-info p {
      margin: 0;
      color: #666;
    }
    .no-prices {
      padding: 40px;
      text-align: center;
      background: #f5f5f5;
      border-radius: 8px;
      color: #666;
    }
  `]
})
export class CompareComponent implements OnInit {
  private productService = inject(ProductService);

  searchQuery = '';
  searchResults: Product[] = [];
  selectedProduct: Product | null = null;

  ngOnInit() {}

  search() {
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe({
        next: (data) => this.searchResults = data,
        error: () => this.searchResults = []
      });
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.searchResults = [];
  }
}
