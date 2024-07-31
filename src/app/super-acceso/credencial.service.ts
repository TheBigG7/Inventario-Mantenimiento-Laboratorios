import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CredencialSuperAcceso } from "./CredencialSuperAcceso";

@Injectable({
    providedIn: 'root'
})
export class CredencialService {

    private urlEndPoint: string = 'http://localhost:8080/api_c/credencial';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    listarCredencialSuperAcceso(): Observable<CredencialSuperAcceso[]> {

        console.log(this.urlEndPoint);

        return this.http.get<CredencialSuperAcceso[]>(this.urlEndPoint);
    }
    crear(credencialSuperAcceso: CredencialSuperAcceso): Observable<CredencialSuperAcceso> {
        return this.http.post<CredencialSuperAcceso>(this.urlEndPoint, credencialSuperAcceso, {headers: this.httpHeaders})
    }

    listarPorId(id = 0): Observable<CredencialSuperAcceso> {
        return this.http.get<CredencialSuperAcceso>(`${this.urlEndPoint}/${id}`)
    }

    login(credencial: string, contrasenia: string): Observable<any> {
        return this.http.post<any>(`${this.urlEndPoint}/login`, { correo: credencial, contrasenia });
    }
}