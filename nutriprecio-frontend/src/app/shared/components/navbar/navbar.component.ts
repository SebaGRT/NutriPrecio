import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  template: `
    <mat-toolbar class="navbar glass-header">
      <a routerLink="/" class="logo">NutriPrecio</a>
      
      <span class="spacer"></span>
      
      <div class="search-bar">
        <mat-form-field appearance="outline" class="modern-search" subscriptSizing="dynamic">
          <input matInput placeholder="Buscar productos..." [(ngModel)]="searchQuery" (keyup.enter)="onSearch()">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>
      
      <span class="spacer"></span>
      
      <nav class="nav-links">
        <a mat-button routerLink="/stores" class="nav-btn">Tiendas</a>
        <a mat-button routerLink="/compare" class="nav-btn">Comparar</a>
        @if (authService.isLoggedIn()) {
          <a mat-button routerLink="/dashboard" class="nav-btn">Panel</a>
          <a mat-button routerLink="/favorites" class="nav-btn">Favoritos</a>
          <button mat-button (click)="logout()" class="nav-btn">Cerrar sesión</button>
        } @else {
          <a mat-button routerLink="/login" class="nav-btn">Iniciar sesión</a>
          <button mat-flat-button color="primary" routerLink="/register" class="nav-btn-primary">Registrarse</button>
        }
      </nav>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 76px;
      padding: 0 40px;
    }
    .glass-header {
      background: rgba(254, 250, 224, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 4px 24px rgba(40, 54, 24, 0.06);
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    }
    .logo {
      font-family: var(--font-display, 'DM Serif Display', serif);
      color: var(--color-espresso, #283618);
      text-decoration: none;
      font-size: 2.25rem;
      font-weight: 400;
      letter-spacing: -0.02em;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .search-bar {
      flex: 1;
      max-width: 480px;
      margin: 0 24px;
    }
    ::ng-deep .modern-search {
      width: 100%;
    }
    ::ng-deep .modern-search .mdc-text-field--outlined {
      border-radius: 28px !important;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(40, 54, 24, 0.04);
    }
    ::ng-deep .modern-search .mdc-notched-outline__leading,
    ::ng-deep .modern-search .mdc-notched-outline__notch,
    ::ng-deep .modern-search .mdc-notched-outline__trailing {
      border-color: rgba(40, 54, 24, 0.1) !important;
      border-width: 1px !important;
    }
    ::ng-deep .modern-search .mdc-text-field--focused .mdc-notched-outline__leading,
    ::ng-deep .modern-search .mdc-text-field--focused .mdc-notched-outline__notch,
    ::ng-deep .modern-search .mdc-text-field--focused .mdc-notched-outline__trailing {
      border-color: var(--color-amber, #606C38) !important;
      border-width: 2px !important;
    }
    ::ng-deep .modern-search .mat-mdc-form-field-icon-suffix {
      color: var(--color-amber, #606C38);
    }
    .nav-links {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .nav-btn {
      font-family: var(--font-body, 'DM Sans', sans-serif);
      color: var(--color-espresso, #283618);
      border-radius: 20px;
      padding: 0 16px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .nav-btn:hover {
      background: rgba(96, 108, 56, 0.08);
      color: var(--color-amber, #606C38);
    }
    .nav-btn-primary {
      font-family: var(--font-body, 'DM Sans', sans-serif);
      border-radius: 20px;
      padding: 0 24px;
      font-weight: 600;
      background-color: var(--color-espresso, #283618);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(40, 54, 24, 0.15);
      margin-left: 8px;
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
