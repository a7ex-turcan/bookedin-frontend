import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface ValidationErrorResponse {
  type: string;
  title: string;
  status: number;
  errors: {
    [key: string]: string[];
  };
  traceId: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  nickname: string = '';
  birthday: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    const errorMessage = this.getErrorMessage();
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.signupUser();
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = this.formatValidationErrors(error);
    } finally {
      this.isLoading = false;
    }
  }

  private isFormValid(): boolean {
    return (
      !!this.fullName && 
      !!this.email && 
      !!this.password && 
      !!this.birthday &&
      this.password === this.confirmPassword
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private getErrorMessage(): string {
    if (!this.fullName || !this.email || !this.password || !this.birthday) {
      return 'Please fill in all required fields';
    }
    if (!this.isValidEmail(this.email)) {
      return 'Please enter a valid email address';
    }
    if (this.password !== this.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  }

  private async signupUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.signUp({
        email: this.email,
        fullName: this.fullName,
        nickname: this.nickname || undefined,
        dateOfBirth: this.birthday,
        password: this.password
      }).subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }

  private formatValidationErrors(error: any): string {
    if (!error.error) {
      return error.message || 'An error occurred during signup';
    }

    // Handle array of error messages format
    if (Array.isArray(error.error.errors)) {
      return error.error.errors.join('\n');
    }

    // Handle RFC validation error format
    if (typeof error.error.errors === 'object') {
      const validationError = error.error as ValidationErrorResponse;
      const errorMessages: string[] = [];
      
      for (const [field, messages] of Object.entries(validationError.errors)) {
        messages.forEach(message => {
          errorMessages.push(message);
        });
      }
      
      return errorMessages.join('\n');
    }

    return error.error.message || 'An error occurred during signup';
  }
}
