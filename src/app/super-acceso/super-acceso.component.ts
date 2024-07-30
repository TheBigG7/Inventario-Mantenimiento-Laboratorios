import { Component } from '@angular/core';
import { AuthService } from '../login/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-acceso',
  templateUrl: './super-acceso.component.html',
  styleUrl: './super-acceso.component.css'
})
export class SuperAccesoComponent {

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
        /* if (this.isAdministradorTIC(response)) {
          if(response.correo == 'superad'){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/dashboarda']);
          }
        } else if (this.isEncargado(response)) {
          this.router.navigate(['/dashboarde']);
        } */
      },
      error => {
        console.error(error);
        console.log("no entro");
        this.mensajeError = 'Credenciales incorrectas';
      }
    );
  }

}
