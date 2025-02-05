import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
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
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  async onSubmit() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // TODO: Implement your signup service call here
      await this.signupUser();
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during signup';
    } finally {
      this.isLoading = false;
    }
  }

  private isFormValid(): boolean {
    return !!this.fullName && !!this.email && !!this.password && !!this.birthday;
  }

  private async signupUser(): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}
