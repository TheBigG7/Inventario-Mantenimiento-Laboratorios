import { Component, OnInit } from '@angular/core';
import { AdministradorTIC } from '../login/administradorTIC';
import { Periodo } from '../periodo';
import { PeriodoService } from './periodo.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AdministradorService } from '../login/administrador.service';
import { CredencialSuperAcceso } from '../super-acceso/CredencialSuperAcceso';
import { CredencialService } from '../super-acceso/credencial.service';

@Component({
  selector: 'app-super-ad',
  templateUrl: './super-ad.component.html',
  styleUrl: './super-ad.component.css'
})
export class SuperAdComponent implements OnInit {

  adminOn: boolean = false
  administrador: boolean = true
  periodoOn: boolean = true


  periodoL: Periodo[]
  administradoresTICs: AdministradorTIC[]

  constructor(private periodoService: PeriodoService, private credencialS: CredencialService, private administradorService: AdministradorService, private activatedRoute: ActivatedRoute) { }

  administradorTic: AdministradorTIC   = {
    administradorTIC_id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: '',
    rol: 'admin',
    periodos: [],
    laboratorios: []
  };
  periodo: Periodo = {
    idPeriodo: 0,
    fechaInicio: '',
    fechaFin: '',
    administradoresTICs: [],
    encargadoLaboratorio: [],
    laboratorios: [],
    credencial: {
      idCredencial: 0,
      credencial: '',
      contrasenia: '',
      periodos: []
    }
  }

  ngOnInit(): void {
    this.credencialS.listarPorId(1).subscribe(
      (dato: CredencialSuperAcceso) => {
        this.periodo.credencial = dato
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    )
    this.periodoService.listarPeriodos().subscribe(
      (periodo :Periodo[]) => { this.periodoL = periodo; console.log(this.periodoL); }, error => {
        Swal.fire('Error', 'Error al listar', 'error');
      }
    )
    this.periodoService.listarPorId(2).subscribe(
      (periodo: Periodo) => {
        console.log('Periodo específico:', periodo);
      },
      (error) => {
        console.error('Error al obtener el periodo específico', error);
      })
    this.administradorService.listarAdmin().subscribe(
      (admin: AdministradorTIC[]) => {this.administradoresTICs = admin; console.log(this.periodoL);}
    )
  }

  actualizarListas(): void {
    this.credencialS.listarPorId(1).subscribe(
      (dato: CredencialSuperAcceso) => {
        this.periodo.credencial = dato
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    )
    this.periodoService.listarPeriodos().subscribe(
      (periodo :Periodo[]) => { this.periodoL = periodo; console.log(this.periodoL); }, error => {
        Swal.fire('Error', 'Error al listar', 'error');
      }
    )
    this.administradorService.listarAdmin().subscribe(
      (admin: AdministradorTIC[]) => this.administradoresTICs = admin
    )
}

  crearPeriodo(): void {
    console.log(this.periodo)
    this.periodoService.crear(this.periodo).subscribe(
      periodo => {
        Swal.fire('Periodo Ingresado', `Periodo ${periodo.fechaInicio} - ${periodo.fechaFin} ingresado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    )
    this.actualizarListas()
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
    this.actualizarListas()
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

  onToggleChange(event: any) {//al hacer cambio de boton
    this.adminOn = event.value;
  }

  admins: AdministradorTIC[] = []
  loadAdministradoresTICs(ids: number[]) {
    // Vaciar completamente el array
    this.admins.length = 0;
    ids.forEach(id => {
      this.administradorService.listarPorIdAdmin(id).subscribe(adm => {
        //this.administradoresTICsCompletos.push(adm);
        this.admins.push(adm);
      });
    });
  }
}


