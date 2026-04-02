import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: { class: 'flex-1 flex flex-col w-full' }
})
export class Login {
  private router = inject(Router);
  theme = inject(ThemeService);
  auth = inject(AuthService)

  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null;
  isLoading: boolean = false;

  onSubmit(loginForm: NgForm) {
    this.errorMessage = null;

    if (loginForm.valid) {
      this.isLoading = true;

      this.auth.Login(this.credentials).subscribe({
        next: (res) => {
          this.isLoading = false;
          
          this.auth.setSession(res);

          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;

          if (err.error && err.error.error) {
            this.errorMessage = err.error.error;
          } else {
            this.errorMessage = 'Szerverhiba történt. Kérjük, próbálja újra később!';
          }
        }
      });
    } else {
      Object.values(loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}