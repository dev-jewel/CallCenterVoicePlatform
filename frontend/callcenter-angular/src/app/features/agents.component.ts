import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, of, switchMap } from 'rxjs';

import { AgentService } from '../services/agent.service';
import { Agent } from '../models/agent';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1>Agents Directory</h1>
          <p class="subtitle">Manage and monitor your call center agents</p>
        </div>
        <button class="btn-primary" (click)="openCreateModal()">
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
              <tr *ngFor="let agent of agents$ | async">
                <td class="font-medium text-slate-900">{{ agent.employeeNumber }}</td>
                <td>
                  <div class="agent-profile">
                    <div class="avatar">{{ agent.displayName.charAt(0) }}</div>
                    <span>{{ agent.displayName }}</span>
                  </div>
                </td>
                <td class="text-slate-500">{{ agent.email }}</td>
                <td>
                  <span class="status-badge" [ngClass]="agent.status?.toLowerCase() || 'offline'">
                    <span class="status-dot"></span>
                    {{ agent.status }}
                  </span>
                </td>
                <td>
                  <div style="display: flex; gap: 0.5rem">
                    <button class="btn-icon" title="Edit Agent" (click)="openEditModal(agent)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button class="btn-icon delete-icon" title="Delete Agent" (click)="deleteAgent(agent)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="(agents$ | async)?.length === 0">
                <td colspan="5" class="empty-state">
                  No agents found. Add some data to the database!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-backdrop" *ngIf="isModalOpen">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Agent' : 'Add New Agent' }}</h2>
          <button class="close-btn" (click)="closeModal()">×</button>
        </div>
        
        <form #agentForm="ngForm" (ngSubmit)="agentForm.form.valid && saveAgent()">
          <div class="modal-body">
            <div *ngIf="errorMessage" class="error-alert">
              {{ errorMessage }}
            </div>

            <div class="form-group">
              <label>Employee Number</label>
              <input type="text" name="employeeNumber" [(ngModel)]="currentAgent.employeeNumber" required #empNo="ngModel" [disabled]="isEditing" [ngClass]="{'is-invalid': empNo.invalid && (empNo.dirty || empNo.touched)}" />
              <div *ngIf="empNo.invalid && (empNo.dirty || empNo.touched)" class="error-text">Employee Number is required.</div>
            </div>
            
            <div class="form-group">
              <label>Display Name</label>
              <input type="text" name="displayName" [(ngModel)]="currentAgent.displayName" required #dispName="ngModel" [ngClass]="{'is-invalid': dispName.invalid && (dispName.dirty || dispName.touched)}" />
              <div *ngIf="dispName.invalid && (dispName.dirty || dispName.touched)" class="error-text">Display Name is required.</div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" name="email" [(ngModel)]="currentAgent.email" required email #email="ngModel" [ngClass]="{'is-invalid': email.invalid && (email.dirty || email.touched)}" />
              <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error-text">A valid email is required.</div>
            </div>

            <div class="form-group">
              <label>Status</label>
              <select name="status" [(ngModel)]="currentAgent.status" required>
                <option value="Offline">Offline</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Break">Break</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="btn-primary" style="margin: 0">Save</button>
          </div>
        </form>
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

    .btn-secondary {
      background: white;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 0.625rem 1.25rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      margin-right: 0.5rem;
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

    .btn-icon.delete-icon:hover {
      background: #fee2e2;
      color: #ef4444;
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

    /* Modal Styles */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 12px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .modal-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #94a3b8;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #475569;
    }

    .modal-body input, .modal-body select {
      width: 100%;
      padding: 0.625rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.875rem;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    
    .modal-body input:focus, .modal-body select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .modal-body input.is-invalid {
      border-color: #ef4444;
    }

    .error-text {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.375rem;
    }
    
    .error-alert {
      background-color: #fee2e2;
      color: #991b1b;
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      border: 1px solid #fca5a5;
    }
    
    .modal-body input:disabled {
      background: #f1f5f9;
      color: #94a3b8;
    }

    .modal-footer {
      padding: 1.25rem 1.5rem;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class AgentsComponent implements OnInit {
  private refresh$ = new BehaviorSubject<void>(undefined);
  agents$: Observable<Agent[]> = this.refresh$.pipe(
    switchMap(() => this.service.list().pipe(
      catchError(err => {
        this.toastr.error('Failed to load agents list');
        return of([]);
      })
    ))
  );

  isModalOpen = false;
  isEditing = false;
  currentAgent: Partial<Agent> = {};
  errorMessage = '';

  constructor(
    private readonly service: AgentService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  openCreateModal() {
    this.isEditing = false;
    this.currentAgent = { status: 'Offline' };
    this.errorMessage = '';
    this.isModalOpen = true;
  }

  openEditModal(agent: Agent) {
    this.isEditing = true;
    this.currentAgent = { ...agent };
    this.errorMessage = '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentAgent = {};
    this.errorMessage = '';
  }

  saveAgent() {
    this.errorMessage = '';
    if (this.isEditing && this.currentAgent.id) {
      this.service.update(this.currentAgent.id, this.currentAgent).subscribe({
        next: () => {
          this.toastr.success('Agent updated successfully');
          this.closeModal();
          this.refresh$.next();
        },
        error: (err) => {
          this.errorMessage = err.error?.title || err.error?.message || err.message || 'An error occurred while saving.';
        }
      });
    } else {
      this.service.create(this.currentAgent).subscribe({
        next: () => {
          this.toastr.success('Agent created successfully');
          this.closeModal();
          this.refresh$.next();
        },
        error: (err) => {
          this.errorMessage = err.error?.title || err.error?.message || err.message || 'An error occurred while saving.';
        }
      });
    }
  }

  deleteAgent(agent: Agent) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${agent.displayName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(agent.id).subscribe({
          next: () => {
            this.toastr.success('Agent deleted successfully');
            this.refresh$.next();
          },
          error: (err) => {
            this.toastr.error(err.error?.title || err.error?.message || 'Failed to delete agent');
          }
        });
      }
    });
  }
}