import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './features/login.component';
import { DashboardComponent } from './features/dashboard.component';
import { AgentsComponent } from './features/agents.component';
export const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, { path: 'agents', component: AgentsComponent, canActivate: [authGuard] }, { path: '', pathMatch: 'full', redirectTo: 'dashboard' }];
