import { Component, OnInit } from '@angular/core';
import { AdministradorTIC } from '../login/administradorTIC';
import { Periodo } from '../periodo';

@Component({
  selector: 'app-super-ad',
  templateUrl: './super-ad.component.html',
  styleUrl: './super-ad.component.css'
})
export class SuperAdComponent implements OnInit{

  public administradorTic: AdministradorTIC = {
    administradorTIC_id: 0,
    nombre: '',
    apellido: '',
    fechaInicio: '',
    fechaFin: '',
    correo: '',
    contraseña: '',
    idPeriodo: 0
  };
  periodo: Periodo = {
    idPeriodo: 0,
    fechaInicio: '',
    fechaFin: '',
    administradorTIC_id: 0,
    idEncargado: 0
  }


  administrador: boolean = true;

  ngOnInit(): void {
  
  }
  eliminar() { }

  crearAdmin() { }
}


