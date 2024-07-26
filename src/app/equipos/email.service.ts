// primero instalamos npm install @sendgrid/mail y creamos una cuenta en SendGrid para poder generar mi api key
// src/app/services/email.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailApiUrl = 'http://api.sendgrid.com/v3/mail/send/enviar-correo'; // Cambia esto a la URL correcta de tu API de correo

  constructor(private http: HttpClient) { }

  sendAlertEmail(equipo: any): Observable<any> {
    return this.http.post(this.emailApiUrl, equipo);
  }
}