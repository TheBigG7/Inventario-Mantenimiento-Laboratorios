import { Component } from '@angular/core';
import { Laboratorio } from '../laboratorios/laboratorio';
import { Periodo } from '../periodo';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import { EncargadoService } from '../login/encargado.service';
import { PeriodoService } from '../super-ad/periodo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratorioService } from '../laboratorios/laboratorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-encargado',
  templateUrl: './form-encargado.component.html',
  styleUrl: './form-encargado.component.css'
})
export class FormEncargadoComponent {
  encargados: boolean = true
  laboratorios: Laboratorio[]
  periodos: Periodo[]
  encargadosL: EncargadoLaboratorio[]
  encargadoLaboratorio: EncargadoLaboratorio = {
    idEncargado: 0,
    nombre: '',
    apellido: '',
    tipo: '',
    correo: '',
    rol:'encargado',
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

  constructor(private encargadoService: EncargadoService, private periodoService: PeriodoService, private router: Router, private activatedRoute: ActivatedRoute, private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let idEncargado = params['id'];
      if (idEncargado) {
        this.encargadoService.listarPorId(idEncargado).subscribe(
          (encargado) => {
            console.log('Encargado obtenido:', encargado);
            this.encargadoLaboratorio = encargado;
          },
          (error) => {
            Swal.fire('Error', 'Error al obtener el encargado', 'error');
          }
        );
      }
    });
    this.encargadoService.listar().subscribe(
      lab => { this.encargadosL = lab; console.log(this.encargadosL); },
      error => {
        Swal.fire('Error', 'Error al listar Encargados', error)
      }
    )
    this.laboratorioService.getLaboratorios().subscribe(
      lab => { this.laboratorios = lab; console.log(this.laboratorios); },
      error => {
        Swal.fire('Error', 'Error al listar Laboratorios', error)
      }
    )
    this.periodoService.listarPeriodos().subscribe(
      per => { this.periodos = per; console.log(this.periodos); },
      error => {
        Swal.fire('Error', 'Error al obtener Periodos', error)
      }
    )
  }

  crearEncargado(): void {
    console.log(this.encargadoLaboratorio)
    this.encargadoService.crear(this.encargadoLaboratorio).subscribe(
      encargado => {
        this.router.navigate(['dashboarda/crear-encargados'])
        Swal.fire('Encargado de Laboratorio Ingresado', `Encargado ${encargado.nombre} - ${encargado.apellido} ingresado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al ingresar encargado', 'error');
      }
    )
  }

}
