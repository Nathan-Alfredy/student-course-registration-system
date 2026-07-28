import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/admins';

  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAdmin(admin: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, admin);
  }

  updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, admin);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
