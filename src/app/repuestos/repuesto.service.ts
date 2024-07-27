import { Injectable } from '@angular/core';
import { Repuestos } from './repuestos';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {

  private urlEndPoint: string = 'http://localhost:8080/api/repuestos'
  private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' })
  
  constructor(private http: HttpClient) { }

  createRepuesto(miRepuesto: Repuestos): Observable<Repuestos> {
    return this.http.post<Repuestos>(this.urlEndPoint, miRepuesto, { headers: this.httpHeaders }).pipe()
  }

  getRepuestobyID(id: number): Observable<Repuestos> {
    return this.http.get<Repuestos>(`${this.urlEndPoint}/${id}`);
  }

  requestRepuestos(): Observable<Repuestos[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Repuestos[])
    )
  }

  deleteRepuesto(id: number): Observable<Repuestos> {
    return this.http.delete<Repuestos>(`${this.urlEndPoint}/${id}`)
  }

  getSiguienteId(): Observable<Repuestos[]> {
    return this.http.get<Repuestos[]>(this.urlEndPoint);
  }

}
