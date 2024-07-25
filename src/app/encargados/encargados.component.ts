import { Component, OnInit } from '@angular/core';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})
export class EncargadosComponent implements OnInit{
  

  encargados: boolean = true
  encargadoLaboratorio: EncargadoLaboratorio

  nombre: string;
  apellido: string;
  laboratorioAsignado: string;
  tipo: string; // "responsable" o "auxiliar"
  correo: string;
  contrasenia: string;

  constructor(){}

  ngOnInit(): void {
    
  }

  eliminar() {

  }
  onSubmit() {
    this.encargadoLaboratorio.nombre = this.nombre
    this.encargadoLaboratorio.apellido = this.apellido
    this.encargadoLaboratorio.laboratorioAsignado = this.laboratorioAsignado
    this.encargadoLaboratorio.tipo = this.tipo
    this.encargadoLaboratorio.correo = this.correo
    this.encargadoLaboratorio.contrasenia = this.contrasenia
  }

  crearEncargado() {

  }

}
