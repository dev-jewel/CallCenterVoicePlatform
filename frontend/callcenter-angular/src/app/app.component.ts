import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({ selector: 'app-root', standalone: true, imports: [RouterLink, RouterOutlet], template: `<header><a routerLink="/dashboard">Call Center</a><nav><a routerLink="/agents">Agents</a></nav></header><main><router-outlet /></main>` })
export class AppComponent {}
