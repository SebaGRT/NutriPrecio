import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <a routerLink="/" class="logo">NutriPrecio</a>
      
      <span class="spacer"></span>
      
      <div class="search-bar">
        <mat-form-field appearance="outline">
          <input matInput placeholder="Buscar productos..." [(ngModel)]="searchQuery" (keyup.enter)="onSearch()">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>
      
      <span class="spacer"></span>
      
      <nav class="nav-links">
        <a mat-button routerLink="/stores">Tiendas</a>
        <a mat-button routerLink="/compare">Comparar</a>
        @if (authService.isLoggedIn()) {
          <a mat-button routerLink="/favorites">Favoritos</a>
          <button mat-button (click)="logout()">Cerrar sesión</button>
        } @else {
          <a mat-button routerLink="/login">Iniciar sesión</a>
          <a mat-button routerLink="/register">Registrarse</a>
        }
      </nav>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .logo {
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .search-bar {
      margin: 0 20px;
    }
    .search-bar mat-form-field {
      width: 300px;
    }
    .nav-links {
      display: flex;
      gap: 8px;
    }
    .nav-links a, .nav-links button {
      color: white;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  searchQuery = '';

  onSearch() {
    if (this.searchQuery.trim()) {
      // Will be implemented with router navigation
    }
  }

  logout() {
    this.authService.logout();
  }
}
