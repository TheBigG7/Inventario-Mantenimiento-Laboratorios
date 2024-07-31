import { Component } from '@angular/core';
import { AuthService } from '../login/Auth.service';
import { Router } from '@angular/router';
import { CredencialService } from './credencial.service';

@Component({
  selector: 'app-super-acceso',
  templateUrl: './super-acceso.component.html',
  styleUrl: './super-acceso.component.css'
})
export class SuperAccesoComponent {

  correo: string;
  contrasenia: string;
  mensajeError: string;

  constructor(private credencialService: CredencialService, private router: Router) { }

  login(): void {
    this.credencialService.login(this.correo, this.contrasenia).subscribe(
      response => {
        // Manejar la respuesta del servidor
        console.log(response);
        // Redirigir al dashboard correspondiente según el tipo de usuario
        // Verificar si response es de tipo AdministradorTIC o Encargado
        if (response) {
          this.router.navigate(['/admin']);
        }
      },
      error => {
        console.error(error);
        console.log("no entro");
        this.mensajeError = 'Credenciales incorrectas';
      }
    );
  }

}
