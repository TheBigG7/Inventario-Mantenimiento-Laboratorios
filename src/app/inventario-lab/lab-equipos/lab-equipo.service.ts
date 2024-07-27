import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabEquipoService {

  private apiUrl = 'http://localhost:8080/api/laboratorios' // Cambia esto por tu URL real

  constructor(private http: HttpClient) {}

  getLaboratorios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEquipos(labId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${labId}/equipos`);
  }
}
