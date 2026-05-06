import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div class="dashboard-container">
      <section class="hero-section">
        <div class="hero-grain"></div>
        <div class="hero-content">
          <div class="accent-line"></div>
          <h1 class="hero-title">
            {{ user?.first_name ? '¡Bienvenido, ' + user?.first_name + '!' : '¡Bienvenido!' }}
          </h1>
          <p class="hero-subtitle">
            {{ user?.is_seller ? 'Este es tu panel de vendedor. Gestiona tu tienda, productos y revisa tu rendimiento.' : 'Este es tu panel de control. Explora productos y gestiona tu perfil.' }}
          </p>
        </div>
      </section>

      <div class="dashboard-content">
        <section class="profile-section">
          <mat-card class="profile-card anim-card" style="animation-delay: 0.1s">
            <mat-card-content>
              <div class="profile-header">
                <div class="avatar" [attr.aria-label]="'Avatar de ' + (user?.first_name || user?.username)">
                  {{ getInitials() }}
                </div>
                <div class="profile-title-group">
                  <h2 class="profile-name">
                    {{ user?.first_name && user?.last_name ? user?.first_name + ' ' + user?.last_name : user?.username }}
                  </h2>
                  <span class="profile-username">&#64;{{ user?.username }}</span>
                </div>
              </div>

              <mat-divider class="profile-divider"></mat-divider>

              <div class="profile-details">
                <div class="detail-row">
                  <mat-icon class="detail-icon" aria-hidden="true">email</mat-icon>
                  <span class="detail-label">Correo</span>
                  <span class="detail-value">{{ user?.email }}</span>
                </div>
                <div class="detail-row">
                  <mat-icon class="detail-icon" aria-hidden="true">badge</mat-icon>
                  <span class="detail-label">Nombre</span>
                  <span class="detail-value">
                    {{ user?.first_name && user?.last_name ? user?.first_name + ' ' + user?.last_name : '—' }}
                  </span>
                </div>
              </div>

              <div class="profile-status">
                <div class="status-chip">
                  <span class="status-dot" aria-hidden="true"></span>
                  Cuenta Activa
                </div>
                @if (user?.is_seller) {
                  <div class="status-chip seller-chip">
                    <mat-icon class="status-icon" aria-hidden="true">storefront</mat-icon>
                    Vendedor
                  </div>
                }
              </div>
            </mat-card-content>
          </mat-card>
        </section>

        <section class="stats-section">
          <mat-card class="stat-card anim-card" style="animation-delay: 0.25s">
            <mat-card-content>
              <div class="stat-icon-wrap" aria-hidden="true">
                <mat-icon>inventory_2</mat-icon>
              </div>
              <span class="stat-value">—</span>
              <span class="stat-label">Productos</span>
              <span class="stat-placeholder">Próximamente</span>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card anim-card" style="animation-delay: 0.35s">
            <mat-card-content>
              <div class="stat-icon-wrap" aria-hidden="true">
                <mat-icon>store</mat-icon>
              </div>
              <span class="stat-value">—</span>
              <span class="stat-label">Tiendas</span>
              <span class="stat-placeholder">Próximamente</span>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card anim-card" style="animation-delay: 0.45s">
            <mat-card-content>
              <div class="stat-icon-wrap" aria-hidden="true">
                <mat-icon>verified</mat-icon>
              </div>
              <span class="stat-value status-text">Activa</span>
              <span class="stat-label">Estado</span>
            </mat-card-content>
          </mat-card>
        </section>

        <section class="actions-section">
          <h3 class="section-heading">Acciones rápidas</h3>
          <div class="actions-grid">
            <mat-card class="action-card anim-card" style="animation-delay: 0.6s">
              <mat-card-content>
                <div class="action-icon-wrap" aria-hidden="true">
                  <mat-icon>inventory_2</mat-icon>
                </div>
                <span class="action-label">Gestionar Productos</span>
                <p class="action-desc">Administra tu catálogo de productos</p>
              </mat-card-content>
              <div class="action-overlay">
                <button mat-raised-button color="primary" disabled aria-label="Gestionar productos - Disponible próximamente">
                  <mat-icon>lock</mat-icon>
                  Próximamente
                </button>
              </div>
            </mat-card>

            <mat-card class="action-card anim-card" style="animation-delay: 0.7s">
              <mat-card-content>
                <div class="action-icon-wrap" aria-hidden="true">
                  <mat-icon>settings</mat-icon>
                </div>
                <span class="action-label">Configurar Perfil</span>
                <p class="action-desc">Actualiza tu información personal</p>
              </mat-card-content>
              <div class="action-overlay">
                <button mat-raised-button color="primary" disabled aria-label="Configurar perfil - Disponible próximamente">
                  <mat-icon>lock</mat-icon>
                  Próximamente
                </button>
              </div>
            </mat-card>
          </div>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);

  user: User | null = null;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  getInitials(): string {
    if (!this.user) return '?';
    const first = this.user.first_name?.trim();
    const last = this.user.last_name?.trim();
    if (first && last) {
      return (first[0] + last[0]).toUpperCase();
    }
    if (first) {
      return first[0].toUpperCase();
    }
    return this.user.username[0].toUpperCase();
  }
}
