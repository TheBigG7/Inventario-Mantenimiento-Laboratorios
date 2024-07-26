// primero instalamos npm install @sendgrid/mail y creamos una cuenta en SendGrid para poder generar mi api key
// src/app/services/email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailApiUrl = 'http://localhost:8080/enviar-correo'; // Cambia esto a la URL correcta de tu API de correo

  constructor(private http: HttpClient) { }

  sendAlertEmail(equipo: any): Observable<any> {
    const emailData = {
      to: 'dereckvergara12@gmail.com', // Reemplaza con el correo de destino
      subject: 'Alerta de Prioridad Alta',
      text: `El equipo con ID ${equipo.id} tiene una prioridad alta.`,
      html: `<p>El equipo con ID ${equipo.id} tiene una prioridad alta.</p>`
    };

    return this.http.post(this.emailApiUrl, emailData);
  }
}