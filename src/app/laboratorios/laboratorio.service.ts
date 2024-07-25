import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Laboratorio } from './laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private urlEndPoint: string = 'http://localhost:8080/api/laboratorios'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getLaboratorios(): Observable<Laboratorio[]> {

    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Laboratorio[])
    );
  }

  create(laboratorio: Laboratorio): Observable<Laboratorio> {
    return this.http.post<Laboratorio>(this.urlEndPoint, laboratorio, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
    //return this.http.post<Laboratorio>(this.urlEndPoint, laboratorio, {headers: this.httpHeaders})
  }

  getLaboratorio(id: String): Observable<Laboratorio> {
    return this.http.get<Laboratorio>(`${this.urlEndPoint}/${id}`);
  }

  deleteLaboratorio(id: String): Observable<Laboratorio> {
    return this.http.delete<Laboratorio>(`${this.urlEndPoint}/${id}`)
  }

  getLaboratoriosId(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.urlEndPoint);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
