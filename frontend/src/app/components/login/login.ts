import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';
  loading = false;

  submit(): void {

    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({

      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },

      error: () => {
        this.loading = false;
        this.error = 'Invalid username or password.';
      }

    });

  }

}
