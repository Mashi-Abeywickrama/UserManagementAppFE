import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.apiService.post('auth/login', data).pipe(
      tap((response) => localStorage.setItem('token', response.token))
    );
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}