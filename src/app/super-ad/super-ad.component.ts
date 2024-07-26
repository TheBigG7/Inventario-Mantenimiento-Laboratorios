import { Component, OnInit } from '@angular/core';
import { AdministradorTIC } from '../login/administradorTIC';
import { Periodo } from '../periodo';
import { PeriodoService } from './periodo.service';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AdministradorService } from '../login/administrador.service';

@Component({
  selector: 'app-super-ad',
  templateUrl: './super-ad.component.html',
  styleUrl: './super-ad.component.css'
})
export class SuperAdComponent implements OnInit {

  adminOn: boolean = true
  administrador: boolean = true
  periodoOn: boolean = true
  periodoL: Periodo[] = []
  administradoresTICs: AdministradorTIC[] = []
  encargados: EncargadoLaboratorio[] = []

  constructor(private periodoService: PeriodoService, private administradorService: AdministradorService, private activatedRoute: ActivatedRoute) { }

  public administradorTic: AdministradorTIC = {
    administradorTIC_id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: '',
    idPeriodo: 0
  };
  periodo: Periodo = {
    idPeriodo: 0,
    fechaInicio: '',
    fechaFin: '',
    administradorTIC_id: 0,
    idEncargado: 0
  }


  ngOnInit(): void {
    this.periodoService.listarPeriodos().subscribe(
      periodo => this.periodoL = periodo
    )
    this.administradorService.listarAdmin().subscribe(
      admin => this.administradoresTICs = admin
    )
  }
  crearPeriodo(): void {
    this.periodoService.crear(this.periodo).subscribe(
      periodo => {
        Swal.fire('Periodo Ingresado', `Periodo ${periodo.fechaInicio} - ${periodo.fechaFin} ingresado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    )
  }
  eliminarPeriodo(id: number): void {
    
    this.periodoService.eliminarPeriodo(id)
      .subscribe(() => {
        //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        Swal.fire('Periodo eliminado', 'Periodo eliminado con exito', 'success');
      })

  }
  editarPeriodo(): void {
    this.administrador = false
    this.activatedRoute.params.subscribe(params => {
      let id = params['idPeriodo']
      if (id) {
        this.periodoService.listarPorId(id).subscribe((periodo) => this.periodo = periodo)
      }
    }, error => {
      Swal.fire('Error', 'Error al guardar', 'error');
    })
  }

  crearAdmin(): void {
    this.administradorService.crearAdmin(this.administradorTic).subscribe(
      admin => {
        Swal.fire('Administrador Ingresado', `Administrador ${admin.nombre} ${admin.apellido} ingresado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    )
  }
  eliminarAdmin(id: number): void {
    this.administradorService.eliminarAdmin(id)
      .subscribe(() => {
        //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        Swal.fire('Periodo eliminado', 'Periodo eliminado con exito', 'success');
      })
  }
  editarAdmin(): void { 

    this.activatedRoute.params.subscribe(params => {
      let id = params['administradorTIC_id']
      if (id) {
        this.administradorService.listarPorIdAdmin(id).subscribe((admin) => this.administradorTic = admin)
      }
    }, error => {
      Swal.fire('Error', 'Error al guardar', 'error');
    })
  }

  onToggleChange(event: any) {
    this.adminOn = event.value;
  }
}


