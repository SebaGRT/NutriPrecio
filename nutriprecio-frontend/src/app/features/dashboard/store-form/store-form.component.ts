import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  template: `
    <div class="store-form-container">
      <mat-card class="store-form-card">
        <mat-card-header>
          <mat-card-title>Registrar Tienda</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Nombre de la tienda</mat-label>
              <input matInput [(ngModel)]="name" name="name" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Sitio web</mat-label>
              <input matInput type="url" [(ngModel)]="website" name="website">
            </mat-form-field>

            <div class="file-field">
              <label for="logo">Logo (opcional)</label>
              <input
                id="logo"
                type="file"
                accept="image/*"
                (change)="onFileSelected($event)"
              />
            </div>

            @if (successMessage) {
              <p class="success-message">{{ successMessage }}</p>
            }

            @if (errorMessage) {
              <p class="error-message">{{ errorMessage }}</p>
            }

            <button mat-raised-button color="primary" type="submit" class="submit-btn">
              Registrar Tienda
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .store-form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 20px;
    }
    .store-form-card {
      width: 100%;
      max-width: 400px;
    }
    mat-card-content {
      padding-top: 16px;
    }
    form mat-form-field {
      width: 100%;
      margin-bottom: 8px;
    }
    .file-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    .file-field label {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 4px;
    }
    .submit-btn {
      width: 100%;
      margin-top: 16px;
    }
    .success-message {
      color: #4caf50;
      margin: 8px 0;
    }
    .error-message {
      color: #f44336;
      margin: 8px 0;
    }
  `]
})
export class StoreFormComponent {
  private storeService = inject(StoreService);
  private router = inject(Router);

  name = '';
  website = '';
  logo: File | null = null;
  successMessage = '';
  errorMessage = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logo = input.files[0];
    }
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.name.trim()) {
      this.errorMessage = 'El nombre de la tienda es obligatorio.';
      return;
    }

    this.storeService.createStore({
      name: this.name.trim(),
      website: this.website.trim() || undefined,
      logo: this.logo || undefined,
    }).subscribe({
      next: () => {
        this.successMessage = '¡Tienda registrada exitosamente!';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: () => {
        this.errorMessage = 'Error al registrar la tienda. Inténtalo de nuevo.';
      }
    });
  }
}
