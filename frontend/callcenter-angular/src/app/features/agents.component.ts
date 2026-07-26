import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { AgentService } from '../services/agent.service';

@Component({ standalone: true, imports: [AsyncPipe, NgFor], template: `<h1>Agents</h1><ul><li *ngFor="let agent of agents | async">{{ agent.displayName }} - {{ agent.status }}</li></ul>` })
export class AgentsComponent implements OnInit {
  agents = this.service.list();
  constructor(private service: AgentService) {}
  ngOnInit() {}
}
