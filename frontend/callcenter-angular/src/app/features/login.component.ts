import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Sign In</h1>

    <form (ngSubmit)="submit()">
      <label>
        Username
        <input
          type="text"
          name="username"
          [(ngModel)]="username"
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          [(ngModel)]="password"
          required
        />
      </label>

      <button type="submit">
        Sign In
      </button>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  submit(): void {
    this.auth.login(this.username, this.password).subscribe(() => {
      this.toastr.success('Logged in successfully!');
      this.router.navigateByUrl('/dashboard');
    });
  }
}