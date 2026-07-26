import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({ providedIn: 'root' }) export class AuthService { constructor(private http: HttpClient) {} login(username: string, password: string) { return this.http.post<{accessToken: string}>('/api/auth/login', { username, password }).pipe(tap(x => localStorage.setItem('access_token', x.accessToken))); } get authenticated() { return !!localStorage.getItem('access_token'); } }
