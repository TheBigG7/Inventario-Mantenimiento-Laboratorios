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

    listar(): Observable<EncargadoLaboratorio[]> {

        console.log(this.urlEndPoint);

        return this.http.get<EncargadoLaboratorio[]>(this.urlEndPoint);
    }
    crear(periodo: EncargadoLaboratorio): Observable<EncargadoLaboratorio> {
        return this.http.post<EncargadoLaboratorio>(this.urlEndPoint, periodo, { headers: this.httpHeaders })
    }

    listarPorId(id = 0): Observable<EncargadoLaboratorio> {
        return this.http.get<EncargadoLaboratorio>(`${this.urlEndPoint}/${id}`)
    }

    eliminar(id: number): Observable<EncargadoLaboratorio> {
        return this.http.delete<EncargadoLaboratorio>(`${this.urlEndPoint}/${id}`);
    }
}