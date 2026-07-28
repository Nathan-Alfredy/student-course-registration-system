import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/registrations';

  getRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRegistration(registration: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, registration);
  }

  updateRegistration(id: number, registration: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, registration);
  }

  deleteRegistration(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
