import { Component, OnInit } from '@angular/core';
import { AdministradorTIC } from '../../login/administradorTIC';
import { AdministradorService } from '../../login/administrador.service';
import { Periodo } from '../../periodo';
import { PeriodoService } from '../periodo.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-admins',
  templateUrl: './form-admins.component.html',
  styleUrl: './form-admins.component.css'
})
export class FormAdminsComponent implements OnInit {


  periodoL: Periodo[]
  administradoresTICs: AdministradorTIC[]
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
  constructor(private periodoService: PeriodoService, private administradorService: AdministradorService, private activatedRoute: ActivatedRoute, private router: Router) { }


/*   periodo: Periodo = {
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
  } */

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.administradorService.listarPorIdAdmin(id).subscribe(
          (admin) => {
            console.log('Periodo obtenido:', admin);
            this.administradorTic = admin;
          },
          (error) => {
            Swal.fire('Error', 'Error al obtener el admin', 'error');
          }
        );
      }
    });
    this.administradorService.listarAdmin().subscribe(
      (admin: AdministradorTIC[]) => {this.administradoresTICs = admin; console.log(admin);}
    )
    this.periodoService.listarPeriodos().subscribe(
      (periodo: Periodo[]) => {this.periodoL = periodo; console.log(this.periodoL);}
    )
  }

  

  crearAdmin(): void {
    this.administradorService.crearAdmin(this.administradorTic).subscribe(
      admin => {
        this.router.navigate(['/super/ad'])
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
      let id = params['id']
      if (id) {
        this.administradorService.listarPorIdAdmin(id).subscribe(
          (admin) => this.administradorTic = admin)
      }
    }, error => {
      Swal.fire('Error', 'Error al guardar', 'error');
    })
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
