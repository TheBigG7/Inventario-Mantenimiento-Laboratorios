import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdministradorTIC } from "./administradorTIC";

@Injectable({
    providedIn: 'root'
})
export class AdministradorService {

    private urlEndPoint: string = 'http://localhost:8080/api_a/admin';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    listarAdmin(): Observable<AdministradorTIC[]> {

        console.log(this.urlEndPoint);

        return this.http.get<AdministradorTIC[]>(this.urlEndPoint);
    }
    crearAdmin(admin: AdministradorTIC): Observable<AdministradorTIC> {
        return this.http.post<AdministradorTIC>(this.urlEndPoint, admin, { headers: this.httpHeaders }) //, { headers: this.httpHeaders }
    }

    listarPorIdAdmin(id = 0): Observable<AdministradorTIC> {
        return this.http.get<AdministradorTIC>(`${this.urlEndPoint}/${id}`)
    }

    eliminarAdmin(id: number): Observable<AdministradorTIC> {
        return this.http.delete<AdministradorTIC>(`${this.urlEndPoint}/${id}`);
    }
}