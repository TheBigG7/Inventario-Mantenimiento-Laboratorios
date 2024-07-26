import { Component } from '@angular/core';
import { EmailService } from './equipos/email.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Inventario-Mantenimiento-Laboratorios';

  constructor(private emailService: EmailService) {}
  enviarCorreo() {
    const equipo = {
      id: 1,
      name: 'Equipo 1',
      description: 'Descripción del equipo 1',
      priority: 'Alta'
    };

    this.emailService.sendAlertEmail(equipo).subscribe(
      response => {
        console.log('Correo enviado exitosamente:', response);
      },
      error => {
        console.error('Error al enviar el correo:', error);
      }
    );
  }
}
