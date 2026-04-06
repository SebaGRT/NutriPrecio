import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CategoryService } from '../../core/services/category.service';
import { ProductService, Product } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    ProductCardComponent,
  ],
  template: `
    <div class="home-container">
      <section class="hero">
        <h1>Compara precios de alimentos saludables</h1>
        <p>Encuentra los mejores precios en supermarkets y tiendas locales</p>
      </section>

      <section class="categories">
        <h2>Categorías</h2>
        <div class="category-grid">
          @for (category of categories; track category.id) {
            <mat-card class="category-card" [routerLink]="['/search']" [queryParams]="{category: category.id}">
              <mat-card-content>
                <mat-icon>category</mat-icon>
                <span>{{ category.name }}</span>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </section>

      <section class="featured-products">
        <h2>Productos Destacados</h2>
        <div class="product-grid">
          @for (product of featuredProducts; track product.id) {
            <app-product-card [product]="product"></app-product-card>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .hero {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #009688 0%, #4db6ac 100%);
      color: white;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    .hero h1 {
      margin: 0 0 16px 0;
      font-size: 2.5rem;
    }
    .hero p {
      margin: 0;
      font-size: 1.25rem;
    }
    .categories {
      margin-bottom: 40px;
    }
    .categories h2 {
      margin-bottom: 20px;
    }
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }
    .category-card {
      cursor: pointer;
      text-align: center;
      padding: 20px;
      transition: transform 0.2s;
    }
    .category-card:hover {
      transform: translateY(-4px);
    }
    .category-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
      color: #009688;
    }
    .category-card span {
      display: block;
      font-weight: 500;
    }
    .featured-products h2 {
      margin-bottom: 20px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
  `]
})
export class HomeComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  categories: any[] = [];
  featuredProducts: Product[] = [];

  ngOnInit() {
    this.loadCategories();
    this.loadFeaturedProducts();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.categories = []
    });
  }

  loadFeaturedProducts() {
    this.productService.getProducts({ page: 1 }).subscribe({
      next: (data) => this.featuredProducts = data.results.slice(0, 8),
      error: () => this.featuredProducts = []
    });
  }
}
