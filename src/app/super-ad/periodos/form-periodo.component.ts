import { Component, OnInit } from '@angular/core';
import { Periodo } from '../../periodo';
import { PeriodoService } from '../periodo.service';
import { CredencialService } from '../../super-acceso/credencial.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CredencialSuperAcceso } from '../../super-acceso/CredencialSuperAcceso';

@Component({
  selector: 'app-form-periodo',
  templateUrl: './form-periodo.component.html',
  styleUrl: './form-periodo.component.css'
})
export class FormPeriodoComponent implements OnInit {

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

  constructor(private periodoService: PeriodoService, private credencialS: CredencialService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    /* this.editarPeriodo() */
    this.activatedRoute.params.subscribe(params => {
      let idPeriodo = params['idPeriodo'];
      if (idPeriodo) {
        this.periodoService.listarPorId(idPeriodo).subscribe(
          (periodo) => {
            console.log('Periodo obtenido:', periodo);
            this.periodo = periodo;
          },
          (error) => {
            Swal.fire('Error', 'Error al obtener el periodo', 'error');
          }
        );
      }
    });
    /* this.credencialS.listarPorId(1).subscribe(
      (dato: CredencialSuperAcceso) => {
        this.periodo.credencial = dato
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }) */
  }


  crearPeriodo(): void {
    console.log(this.periodo)
    this.periodoService.crear(this.periodo).subscribe(
      periodo => {
        this.router.navigate(['/super/p'])
        Swal.fire('Periodo Ingresado', `Periodo ${periodo.fechaInicio} - ${periodo.fechaFin} ingresado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    )
  }


  editarPeriodo(): void {
    this.activatedRoute.params.subscribe(params => {
      let idPeriodo = params['idPeriodo']
      if (idPeriodo) {
        this.periodoService.listarPorId(idPeriodo).subscribe(
          (periodo: Periodo) => {this.periodo = periodo
            console.log('Periodo específico:', periodo);
          })
      }
    }, error => {
      Swal.fire('Error', 'Error al guardar', 'error');
    })
  }
  /* cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['idPeriodo']
      if (id) {
        //this.clienteService.getCliente(id).subscribe((cliente)=>this.cliente=cliente)
        this.periodoService.listarPorId(id).subscribe(
          (periodo: Periodo) => {
            console.log('Periodo específico:', periodo);
          })
      }
    })
  } */
}
