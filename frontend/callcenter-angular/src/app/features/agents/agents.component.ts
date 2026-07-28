import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, of, switchMap } from 'rxjs';

import { AgentService } from '../../services/agent.service';
import { Agent } from '../../models/agent';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
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
