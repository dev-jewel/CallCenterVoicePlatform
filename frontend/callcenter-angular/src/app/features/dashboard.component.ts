import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Operations Dashboard</h1>
        <p class="subtitle">Real-time overview of call center activity</p>
      </header>

      <div class="metrics-grid">
        <!-- Metric Card 1 -->
        <div class="metric-card">
          <div class="metric-icon active-calls-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div class="metric-info">
            <h3>Active Calls</h3>
            <p class="metric-value">24</p>
            <span class="trend positive">↑ 12% vs last hour</span>
          </div>
        </div>

        <!-- Metric Card 2 -->
        <div class="metric-card">
          <div class="metric-icon agents-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="metric-info">
            <h3>Agents Online</h3>
            <p class="metric-value">12 <span class="text-sm">/ 15</span></p>
            <span class="trend neutral">Optimal staffing</span>
          </div>
        </div>

        <!-- Metric Card 3 -->
        <div class="metric-card">
          <div class="metric-icon aht-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="metric-info">
            <h3>Avg Handle Time</h3>
            <p class="metric-value">4m 12s</p>
            <span class="trend negative">↓ 30s vs target</span>
          </div>
        </div>

        <!-- Metric Card 4 -->
        <div class="metric-card">
          <div class="metric-icon queue-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div class="metric-info">
            <h3>Queue Length</h3>
            <p class="metric-value">5</p>
            <span class="trend warning">Approaching limit</span>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="card recent-calls-card">
          <div class="card-header">
            <h2>Recent Calls</h2>
            <button class="btn-secondary">View All</button>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Caller ID</th>
                  <th>Agent</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let call of recentCalls">
                  <td class="caller-id">{{ call.callerId }}</td>
                  <td>{{ call.agent }}</td>
                  <td>{{ call.duration }}</td>
                  <td>
                    <span class="status-badge" [ngClass]="call.status.toLowerCase()">
                      {{ call.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card service-level-card">
          <div class="card-header">
            <h2>Service Level (SLA)</h2>
          </div>
          <div class="sla-content">
            <div class="sla-circle">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="circle"
                  stroke-dasharray="92, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">92%</text>
              </svg>
            </div>
            <p class="sla-desc">Calls answered within 20 seconds.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f8fafc;
      min-height: 100vh;
      margin: -2rem -1rem 0 -1rem; /* Negate main padding to allow full width bg */
      padding: 2rem;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
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

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.025);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
    }

    .metric-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.25rem;
      flex-shrink: 0;
    }

    .metric-icon svg {
      width: 24px;
      height: 24px;
    }

    .active-calls-icon { background: #eff6ff; color: #3b82f6; }
    .agents-icon { background: #f0fdf4; color: #22c55e; }
    .aht-icon { background: #fef2f2; color: #ef4444; }
    .queue-icon { background: #fffbeb; color: #f59e0b; }

    .metric-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .metric-value {
      margin: 0 0 0.5rem 0;
      font-size: 1.875rem;
      font-weight: 700;
      color: #0f172a;
    }

    .text-sm {
      font-size: 1rem;
      color: #94a3b8;
    }

    .trend {
      font-size: 0.875rem;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
    }

    .trend.positive { color: #22c55e; }
    .trend.negative { color: #ef4444; }
    .trend.warning { color: #f59e0b; }
    .trend.neutral { color: #64748b; }

    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }

    @media (max-width: 968px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #0f172a;
      font-weight: 600;
    }

    .btn-secondary {
      background: white;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #0f172a;
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
    }

    .data-table tbody tr:last-child td {
      border-bottom: none;
    }

    .data-table tbody tr:hover {
      background-color: #f8fafc;
    }

    .caller-id {
      font-weight: 600;
      color: #0f172a;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      display: inline-block;
    }

    .status-badge.active { background: #dcfce7; color: #166534; }
    .status-badge.completed { background: #e0e7ff; color: #3730a3; }
    .status-badge.waiting { background: #fef3c7; color: #92400e; }

    .sla-content {
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .sla-circle {
      width: 160px;
      height: 160px;
    }

    .circular-chart {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 250px;
    }

    .circle-bg {
      fill: none;
      stroke: #f1f5f9;
      stroke-width: 3.8;
    }

    .circle {
      fill: none;
      stroke-width: 2.8;
      stroke-linecap: round;
      stroke: #3b82f6;
      animation: progress 1s ease-out forwards;
    }

    @keyframes progress {
      0% {
        stroke-dasharray: 0 100;
      }
    }

    .percentage {
      fill: #0f172a;
      font-family: 'Inter', sans-serif;
      font-size: 0.5em;
      font-weight: 700;
      text-anchor: middle;
    }

    .sla-desc {
      margin-top: 1.5rem;
      color: #64748b;
      font-size: 0.875rem;
      text-align: center;
    }
  `]
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