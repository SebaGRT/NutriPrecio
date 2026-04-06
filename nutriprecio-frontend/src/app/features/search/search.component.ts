import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductService, Product, ProductListResponse } from '../../core/services/product.service';
import { CategoryService, Category } from '../../core/services/category.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    ProductCardComponent,
  ],
  template: `
    <div class="search-container">
      <aside class="filters">
        <h3>Filtros</h3>
        
        <mat-form-field appearance="outline">
          <mat-label>Buscar</mat-label>
          <input matInput [(ngModel)]="searchQuery" placeholder="Nombre del producto...">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Categoría</mat-label>
          <mat-select [(ngModel)]="selectedCategory" (selectionChange)="onFilterChange()">
            <mat-option [value]="null">Todas</mat-option>
            @for (category of categories; track category.id) {
              <mat-option [value]="category.id">{{ category.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Marca</mat-label>
          <mat-select [(ngModel)]="selectedBrand" (selectionChange)="onFilterChange()">
            <mat-option [value]="null">Todas</mat-option>
            @for (brand of brands; track brand) {
              <mat-option [value]="brand">{{ brand }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="onFilterChange()">Aplicar filtros</button>
        <button mat-button (click)="clearFilters()">Limpiar filtros</button>
      </aside>

      <main class="results">
        <h2>
          @if (searchQuery) {
            Resultados para "{{ searchQuery }}"
          } @else {
            Todos los productos
          }
        </h2>
        
        <div class="product-grid">
          @for (product of products; track product.id) {
            <app-product-card [product]="product"></app-product-card>
          } @empty {
            <p class="no-results">No se encontraron productos</p>
          }
        </div>

        <mat-paginator
          [length]="totalItems"
          [pageSize]="pageSize"
          [pageIndex]="pageIndex"
          [pageSizeOptions]="[20, 50, 100]"
          (page)="onPageChange($event)"
          aria-label="Select page">
        </mat-paginator>
      </main>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      gap: 24px;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }
    .filters {
      width: 250px;
      flex-shrink: 0;
    }
    .filters h3 {
      margin: 0 0 16px 0;
    }
    .filters mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .filters button {
      width: 100%;
      margin-bottom: 8px;
    }
    .results {
      flex: 1;
    }
    .results h2 {
      margin: 0 0 20px 0;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #666;
    }
    mat-paginator {
      margin-top: 24px;
    }
  `]
})
export class SearchComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  products: Product[] = [];
  categories: Category[] = [];
  brands: string[] = [];

  searchQuery = '';
  selectedCategory: number | null = null;
  selectedBrand: string | null = null;

  totalItems = 0;
  pageSize = 20;
  pageIndex = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.selectedCategory = params['category'] ? +params['category'] : null;
      this.loadProducts();
    });

    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts({
      search: this.searchQuery,
      category: this.selectedCategory || undefined,
      brand: this.selectedBrand || undefined,
      page: this.pageIndex + 1,
    }).subscribe({
      next: (data: ProductListResponse) => {
        this.products = data.results;
        this.totalItems = data.count;
      },
      error: () => {
        this.products = [];
        this.totalItems = 0;
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.extractBrands();
      },
      error: () => this.categories = []
    });
  }

  extractBrands() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        const uniqueBrands = new Set<string>();
        data.results.forEach(p => {
          if (p.brand) uniqueBrands.add(p.brand);
        });
        this.brands = Array.from(uniqueBrands).sort();
      },
      error: () => this.brands = []
    });
  }

  onFilterChange() {
    this.pageIndex = 0;
    this.updateQueryParams();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = null;
    this.selectedBrand = null;
    this.pageIndex = 0;
    this.updateQueryParams();
  }

  updateQueryParams() {
    const queryParams: any = {};
    if (this.searchQuery) queryParams['q'] = this.searchQuery;
    if (this.selectedCategory) queryParams['category'] = this.selectedCategory;
    if (this.selectedBrand) queryParams['brand'] = this.selectedBrand;
    this.router.navigate([], { queryParams });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
}
