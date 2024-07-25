// primero instalamos npm install @sendgrid/mail y creamos una cuenta en SendGrid para poder generar mi api key
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private sendGridApiUrl = 'https://api.sendgrid.com/v3/mail/send';
  private sendGridApiKey = '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'; // Reemplaza con tu API Key de SendGrid

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.sendGridApiKey}`
    });

    const body = {
      personalizations: [{
        to: [{ email: to }]
      }],
      from: { email: 'tu_email@tu_dominio.com' },
      subject: subject,
      content: [{
        type: 'text/plain',
        value: text
      }]
    };

    return this.http.post(this.sendGridApiUrl, body, { headers: headers });
  }
}
