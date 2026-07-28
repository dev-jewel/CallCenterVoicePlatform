import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  recentCalls = [
    { callerId: '+1 (555) 123-4567', agent: 'Sarah Jenkins', duration: '05:23', status: 'Active' },
    { callerId: '+1 (555) 987-6543', agent: 'Michael Chen', duration: '12:05', status: 'Active' },
    { callerId: '+1 (555) 456-7890', agent: 'David Smith', duration: '02:15', status: 'Completed' },
    { callerId: '+1 (555) 234-5678', agent: 'Waiting...', duration: '00:45', status: 'Waiting' },
    { callerId: '+1 (555) 876-5432', agent: 'Emily Davis', duration: '08:30', status: 'Completed' }
  ];
}