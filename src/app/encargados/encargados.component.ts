import { Component } from '@angular/core';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})
export class EncargadosComponent {

  encargados: boolean = true;
  encargadoLaboratorio: EncargadoLaboratorio

  eliminar(){
    
  }
  onSubmit(){

  }

}
