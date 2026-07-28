import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
