import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/departments';

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDepartment(department: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, department);
  }

  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
