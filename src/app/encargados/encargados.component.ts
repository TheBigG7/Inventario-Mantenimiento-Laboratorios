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
  encargadoLaboratorio: EncargadoLaboratorio


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
