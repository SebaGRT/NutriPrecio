import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <footer class="footer">
      <mat-toolbar color="accent">
        <div class="footer-content">
          <p>&copy; 2026 NutriPrecio. Compara precios de alimentos saludables.</p>
          <div class="footer-links">
            <a href="/about">Acerca de</a>
            <a href="/contact">Contacto</a>
            <a href="/privacy">Privacidad</a>
          </div>
        </div>
      </mat-toolbar>
    </footer>
  `,
  styles: [`
    .footer {
      margin-top: auto;
    }
    .footer-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-links a {
      color: white;
      margin-left: 16px;
      text-decoration: none;
    }
  `]
})
export class FooterComponent {}
