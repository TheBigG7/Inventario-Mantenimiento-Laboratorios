import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Equipo } from './equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private urlEndPoint: string = 'http://localhost:8080/api/equipos'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEquipos(): Observable<Equipo[]> {

    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Equipo[])
    );
  }

  create(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.urlEndPoint, equipo, {headers: this.httpHeaders});
  }

  getEquipo(id: number):Observable<Equipo> {
    return this.http.get<Equipo>(`${this.urlEndPoint}/${id}`);
  }

  deleteEquipo(id: number): Observable<Equipo> {
    return this.http.delete<Equipo>(`${this.urlEndPoint}/${id}`);
  }

  getUltimoId(): Observable<number> {
    return this.http.get<number>(`${this.urlEndPoint}/ultimoId`);
  } 
}
