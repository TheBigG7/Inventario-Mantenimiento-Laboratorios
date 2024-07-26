import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
          if(response.correo == 'superad'){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/dashboarda']);
          }
        } else if (this.isEncargado(response)) {
          this.router.navigate(['/dashboarde']);
        }
      },
      error => {
        console.error(error);
        console.log("no entro");
        this.mensajeError = 'Credenciales incorrectas';
      }
    );
  }

  // Métodos para verificar los tipos
  isAdministradorTIC(response: any): response is AdministradorTIC {
    //return response.role === 'admin' && /* otras condiciones específicas para AdministradorTIC */;
    return response
  }

  isEncargado(response: any): response is EncargadoLaboratorio {
    /* return response.role === 'encargado' &&  otras condiciones específicas para Encargado ; */
    return response
  }
}
