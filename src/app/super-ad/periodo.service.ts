import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Periodo } from "../periodo";

@Injectable({
    providedIn: 'root'
})
export class PeriodoService {

    private urlEndPoint: string = 'http://localhost:8080/api_p/periodo';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    listarPeriodos(): Observable<Periodo[]> {

        console.log(this.urlEndPoint);

        return this.http.get<Periodo[]>(this.urlEndPoint);
    }
    crear(periodo: Periodo): Observable<Periodo> {
        return this.http.post<Periodo>(this.urlEndPoint, periodo, { headers: this.httpHeaders })
    }

    listarPorId(id = 0): Observable<Periodo> {
        return this.http.get<Periodo>(`${this.urlEndPoint}/${id}`)
    }

    eliminarPeriodo(id: number): Observable<Periodo> {
        return this.http.delete<Periodo>(`${this.urlEndPoint}/${id}`);
    }
}