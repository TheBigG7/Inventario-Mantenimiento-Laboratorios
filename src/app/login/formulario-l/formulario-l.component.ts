import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-l',
  templateUrl: './formulario-l.component.html',
  styleUrl: './formulario-l.component.css'
})
export class FormularioLComponent {

  correo: string;
  contrasena: string;
  mensajeError: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.correo, this.contrasena).subscribe(
      response => {
        // Manejar la respuesta del servidor
        console.log(response);
        // Redirigir al dashboard correspondiente según el tipo de usuario
        // Ejemplo de redirección:
        if (response.role === 'admin') {
          this.router.navigate(['/dasboarda']);
        } else if (response.role === 'encargado') {
          this.router.navigate(['/dasboarda']);
        }
      },
      error => {
        console.error(error);
        this.mensajeError = 'Credenciales incorrectas';
      }
    );
  }

}
