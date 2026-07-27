import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Agent } from '../models/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Agent[]>(`${environment.apiUrl}/agents`);
  }

  create(agent: Partial<Agent>) {
    return this.http.post<Agent>(`${environment.apiUrl}/agents`, agent);
  }

  update(id: string, agent: Partial<Agent>) {
    return this.http.put<Agent>(`${environment.apiUrl}/agents/${id}`, agent);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/agents/${id}`);
  }
}