import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface LatestPrice {
  price: number;
  original_price: number | null;
  discount_percentage: number;
  store: string;
  in_stock: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  unit: string;
  image: string;
  latest_price: LatestPrice | null;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule],
  template: `
    <mat-card class="product-card" *ngIf="product">
      <img mat-card-image [src]="product.image || 'assets/no-image.png'" [alt]="product.name" class="product-image">
      <mat-card-content>
        <h3 class="product-name">
          <a [routerLink]="['/products', product.slug]">{{ product.name }}</a>
        </h3>
        <p class="product-brand" *ngIf="product.brand">{{ product.brand }}</p>
        <p class="product-unit">{{ product.unit }}</p>
        <div class="product-price" *ngIf="product.latest_price">
          <span class="price">{{ product.latest_price.price | currency:'CLP':'symbol':'1.0-0' }}</span>
          @if (product.latest_price.original_price) {
            <span class="original-price">{{ product.latest_price.original_price | currency:'CLP':'symbol':'1.0-0' }}</span>
          }
          @if (product.latest_price.discount_percentage > 0) {
            <span class="discount">-{{ product.latest_price.discount_percentage }}%</span>
          }
          <p class="store-name">{{ product.latest_price.store }}</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.2s;
    }
    .product-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .product-image {
      height: 200px;
      object-fit: contain;
      padding: 16px;
    }
    mat-card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .product-name {
      margin: 0 0 8px 0;
      font-size: 1rem;
    }
    .product-name a {
      color: #333;
      text-decoration: none;
    }
    .product-name a:hover {
      color: #009688;
    }
    .product-brand {
      color: #666;
      margin: 0 0 4px 0;
    }
    .product-unit {
      color: #999;
      font-size: 0.875rem;
      margin: 0 0 12px 0;
    }
    .product-price {
      margin-top: auto;
    }
    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #009688;
    }
    .original-price {
      text-decoration: line-through;
      color: #999;
      margin-left: 8px;
      font-size: 0.875rem;
    }
    .discount {
      color: #e53935;
      font-weight: bold;
      margin-left: 8px;
    }
    .store-name {
      color: #666;
      font-size: 0.875rem;
      margin: 4px 0 0 0;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}
