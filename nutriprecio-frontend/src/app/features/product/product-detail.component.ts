import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
  template: `
    <div class="product-detail-container" *ngIf="product">
      <div class="product-header">
        <img [src]="product.image || 'assets/no-image.png'" [alt]="product.name" class="product-image">
        
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="brand" *ngIf="product.brand">Marca: {{ product.brand }}</p>
          <p class="category">Categoría: {{ product.category_name }}</p>
          <p class="unit">Unidad: {{ product.unit }}</p>
          
          <div class="current-price" *ngIf="product.latest_price">
            <span class="price">{{ product.latest_price.price | currency:'CLP':'symbol':'1.0-0' }}</span>
            @if (product.latest_price.original_price) {
              <span class="original-price">{{ product.latest_price.original_price | currency:'CLP':'symbol':'1.0-0' }}</span>
            }
            @if (product.latest_price.discount_percentage > 0) {
              <span class="discount">-{{ product.latest_price.discount_percentage }}%</span>
            }
            <p class="store">Tienda: {{ product.latest_price.store }}</p>
            <p class="stock" [class.out-of-stock]="!product.latest_price.in_stock">
              {{ product.latest_price.in_stock ? 'En stock' : 'Sin stock' }}
            </p>
          </div>
        </div>
      </div>

      <section class="price-history">
        <h2>Historial de precios</h2>
        <p>Próximamente...</p>
      </section>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .product-header {
      display: flex;
      gap: 40px;
      margin-bottom: 40px;
    }
    .product-image {
      width: 400px;
      height: 400px;
      object-fit: contain;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
    }
    .product-info {
      flex: 1;
    }
    .product-info h1 {
      margin: 0 0 16px 0;
      font-size: 2rem;
    }
    .product-info p {
      margin: 8px 0;
      color: #666;
    }
    .current-price {
      margin-top: 24px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .price {
      font-size: 2rem;
      font-weight: bold;
      color: #009688;
    }
    .original-price {
      text-decoration: line-through;
      color: #999;
      margin-left: 16px;
      font-size: 1.25rem;
    }
    .discount {
      color: #e53935;
      font-weight: bold;
      margin-left: 16px;
      font-size: 1.25rem;
    }
    .store, .stock {
      margin-top: 8px;
      font-weight: 500;
    }
    .out-of-stock {
      color: #e53935;
    }
    .price-history {
      margin-top: 40px;
    }
    .price-history h2 {
      margin-bottom: 20px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);

  @Input() slug = '';

  product: Product | null = null;

  ngOnInit() {
    if (this.slug) {
      this.loadProduct();
    }
  }

  loadProduct() {
    this.productService.getProduct(this.slug).subscribe({
      next: (data) => this.product = data,
      error: () => this.product = null
    });
  }
}
