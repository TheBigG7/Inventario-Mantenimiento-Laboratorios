import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EncargadoLaboratorio } from "./encargadoLaboratorio";

@Injectable({
    providedIn: 'root'
})
export class EncargadoService {

    private urlEndPoint: string = 'http://localhost:8080/api_e/encargado';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    listarAdmin(): Observable<EncargadoLaboratorio[]> {

        console.log(this.urlEndPoint);

        return this.http.get<EncargadoLaboratorio[]>(this.urlEndPoint);
    }
    crearAdmin(periodo: EncargadoLaboratorio): Observable<EncargadoLaboratorio> {
        return this.http.post<EncargadoLaboratorio>(this.urlEndPoint, periodo, { headers: this.httpHeaders })
    }

    listarPorIdAdmin(id = 0): Observable<EncargadoLaboratorio> {
        return this.http.get<EncargadoLaboratorio>(`${this.urlEndPoint}/${id}`)
    }

    eliminarAdmin(id: number): Observable<EncargadoLaboratorio> {
        return this.http.delete<EncargadoLaboratorio>(`${this.urlEndPoint}/${id}`);
    }
}