import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';


  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  onSubmit() {
    this.http.post<{ token: string }>('/api/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          void this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage = 'Email or password is incorrect';
        }
      });
  }
}
