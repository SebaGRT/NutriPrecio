import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h2 class="footer-logo">NutriPrecio</h2>
          <p class="footer-desc">Encuentra los mejores precios en supermercados y tiendas locales. Tu aliado para una alimentación saludable y económica.</p>
        </div>
        
        <div class="footer-links-group">
          <h3>Plataforma</h3>
          <a href="/stores">Tiendas</a>
          <a href="/compare">Comparar Precios</a>
          <a href="/dashboard">Panel de Usuario</a>
        </div>
        
        <div class="footer-links-group">
          <h3>Compañía</h3>
          <a href="/about">Acerca de nosotros</a>
          <a href="/contact">Contacto</a>
          <a href="/privacy">Privacidad y Términos</a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 NutriPrecio. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-espresso, #283618);
      color: var(--color-cream, #FEFAE0);
      padding: 64px 20px 24px;
      margin-top: auto;
      font-family: var(--font-body, 'DM Sans', sans-serif);
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 40px;
      margin-bottom: 48px;
    }
    @media (min-width: 768px) {
      .footer-container {
        grid-template-columns: 2fr 1fr 1fr;
      }
    }
    .footer-brand {
      max-width: 360px;
    }
    .footer-logo {
      font-family: var(--font-display, 'DM Serif Display', serif);
      font-size: 2rem;
      margin: 0 0 16px 0;
      color: var(--color-clay, #DDA15E);
    }
    .footer-desc {
      color: rgba(254, 250, 224, 0.8);
      line-height: 1.6;
      margin: 0;
    }
    .footer-links-group h3 {
      font-family: var(--font-body, 'DM Sans', sans-serif);
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 20px 0;
      color: #fff;
    }
    .footer-links-group a {
      display: block;
      color: rgba(254, 250, 224, 0.7);
      text-decoration: none;
      margin-bottom: 12px;
      transition: color 0.2s ease;
    }
    .footer-links-group a:hover {
      color: var(--color-clay, #DDA15E);
    }
    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 24px;
      border-top: 1px solid rgba(254, 250, 224, 0.15);
      text-align: center;
      color: rgba(254, 250, 224, 0.6);
      font-size: 0.875rem;
    }
  `]
})
export class FooterComponent {}
