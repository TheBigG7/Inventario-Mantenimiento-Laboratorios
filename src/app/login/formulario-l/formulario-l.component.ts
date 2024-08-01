import { Component } from '@angular/core';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';
import { AdministradorTIC } from '../administradorTIC';
import { EncargadoLaboratorio } from '../encargadoLaboratorio';

@Component({
  selector: 'app-formulario-l',
  templateUrl: './formulario-l.component.html',
  styleUrl: './formulario-l.component.css'
})
export class FormularioLComponent {

  correo: string;
  contrasenia: string;
  mensajeError: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.correo, this.contrasenia).subscribe(
      response => {
        // Manejar la respuesta del servidor
        console.log(response);
        // Redirigir al dashboard correspondiente según el tipo de usuario
        // Verificar si response es de tipo AdministradorTIC o Encargado
        if (this.isAdministradorTIC(response)) {
          console.log('ad')
            this.router.navigate(['/dashboarda']);
        } else if(this.isEncargado(response)) {
          console.log('en')
            this.router.navigate(['/dashboarde']);
        }
      },
      error => {
        console.error(error);
        this.mensajeError = 'Credenciales incorrectas';
      }
    );
  }

  // Metodos para verificar los tipos
  isAdministradorTIC(response: any): response is AdministradorTIC {
    return response && response.rol === 'admin';
  }

  isEncargado(response: any): response is EncargadoLaboratorio {
    return response && response.rol === 'encargado';
  }
}
