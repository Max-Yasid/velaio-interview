import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class PostgresRepositoryService {
  private endpoint = `${environment.services.interviewBackend.endpoint}/task`;
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<Task[]>(this.endpoint);
  }
  delete(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  create(task: Task) {
    return this.http.post<string>(this.endpoint, task);
  }
  changeStatus(id: number, completed: boolean) {
    return this.http.patch<boolean>(`${this.endpoint}/${id}`, { completed });
  }
}
