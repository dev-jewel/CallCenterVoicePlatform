import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, CommonModule } from '@angular/common';

import { AgentService } from '../services/agent.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1>Agents Directory</h1>
          <p class="subtitle">Manage and monitor your call center agents</p>
        </div>
        <button class="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Agent
        </button>
      </header>

      <div class="card">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee #</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let agent of agents | async">
                <td class="font-medium text-slate-900">{{ agent.employeeNumber }}</td>
                <td>
                  <div class="agent-profile">
                    <div class="avatar">{{ agent.displayName.charAt(0) }}</div>
                    <span>{{ agent.displayName }}</span>
                  </div>
                </td>
                <td class="text-slate-500">{{ agent.email }}</td>
                <td>
                  <span class="status-badge" [ngClass]="agent.status.toLowerCase()">
                    <span class="status-dot"></span>
                    {{ agent.status }}
                  </span>
                </td>
                <td>
                  <button class="btn-icon" title="Edit Agent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </td>
              </tr>
              <!-- Empty state if no agents -->
              <tr *ngIf="(agents | async)?.length === 0">
                <td colspan="5" class="empty-state">
                  No agents found. Add some data to the database!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f8fafc;
      min-height: 100vh;
      margin: -2rem -1rem 0 -1rem; 
      padding: 2rem;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin: 0;
      color: #0f172a;
      font-size: 1.875rem;
      font-weight: 700;
      letter-spacing: -0.025em;
    }

    .subtitle {
      margin: 0.5rem 0 0 0;
      color: #64748b;
      font-size: 1rem;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #0f172a;
      color: white;
      border: none;
      padding: 0.625rem 1.25rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary:hover {
      background: #1e293b;
    }

    .btn-primary svg {
      width: 18px;
      height: 18px;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.025);
      overflow: hidden;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .data-table th {
      padding: 1rem 1.5rem;
      background: #f8fafc;
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #f1f5f9;
    }

    .data-table td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 0.875rem;
      vertical-align: middle;
    }

    .data-table tbody tr:last-child td {
      border-bottom: none;
    }

    .data-table tbody tr:hover {
      background-color: #f8fafc;
    }

    .font-medium {
      font-weight: 500;
    }
    
    .text-slate-900 { color: #0f172a; }
    .text-slate-500 { color: #64748b; }

    .agent-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #e2e8f0;
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: #f1f5f9;
      color: #475569;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #94a3b8;
    }

    .status-badge.available { background: #dcfce7; color: #166534; }
    .status-badge.available .status-dot { background: #22c55e; }

    .status-badge.busy { background: #fee2e2; color: #991b1b; }
    .status-badge.busy .status-dot { background: #ef4444; }

    .status-badge.break { background: #fef3c7; color: #92400e; }
    .status-badge.break .status-dot { background: #f59e0b; }
    
    .status-badge.offline { background: #f1f5f9; color: #475569; }
    .status-badge.offline .status-dot { background: #94a3b8; }

    .btn-icon {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 6px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-icon:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .btn-icon svg {
      width: 18px;
      height: 18px;
    }

    .empty-state {
      text-align: center;
      padding: 3rem !important;
      color: #64748b;
      font-style: italic;
    }
  `]
})
export class AgentsComponent implements OnInit {
  agents = this.service.list();

  constructor(
    private readonly service: AgentService
  ) {}

  ngOnInit(): void {}
}