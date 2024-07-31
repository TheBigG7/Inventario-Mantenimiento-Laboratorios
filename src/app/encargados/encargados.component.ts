import { Component, OnInit } from '@angular/core';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import { E } from '@angular/cdk/keycodes';
import { Laboratorio } from '../laboratorios/laboratorio';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})
export class EncargadosComponent implements OnInit{
  

  encargados: boolean = true
  encargadoLaboratorio: EncargadoLaboratorio = {
    idPeriodo: 0,
    nombre: '',
    apellido: '',
    tipo: '',
    correo: '',
    contrasenia: '',
    periodos: [],
    laboratorio: {
      idLaboratorio: '',
      num_maquinas: 0,
      proyector: '',
      equipos: [],
      administradores: [],
      periodos: [],
      encargados: []
    }
  }

  constructor(){}

  ngOnInit(): void {
    
  }

  eliminar() {

  }
  onSubmit() {

  }

  crearEncargado() {

  }

}
