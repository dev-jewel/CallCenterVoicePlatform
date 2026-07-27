import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}/auth/login`, {
        username,
        password
      })
      .pipe(
        tap(response => {
          localStorage.setItem(
            'access_token',
            response.accessToken
          );
        })
      );
  }

  get authenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}