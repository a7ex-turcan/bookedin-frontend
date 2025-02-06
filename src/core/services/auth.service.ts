import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SignUpRequest {
  email: string;
  fullName: string;
  nickname?: string;
  dateOfBirth: string;
  password: string;
}

interface SignUpResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth/signup';

  constructor(private http: HttpClient) {}

  signUp(signUpRequest: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(this.apiUrl, signUpRequest);
  }
}