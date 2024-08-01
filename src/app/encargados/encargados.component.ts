import { Component, OnInit } from '@angular/core';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import { E } from '@angular/cdk/keycodes';
import { Laboratorio } from '../laboratorios/laboratorio';
import { EncargadoService } from '../login/encargado.service';
import { ActivatedRoute } from '@angular/router';
import { LaboratorioService } from '../laboratorios/laboratorio.service';
import Swal from 'sweetalert2';
import { Periodo } from '../periodo';
import { PeriodoService } from '../super-ad/periodo.service';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})
export class EncargadosComponent implements OnInit {

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

  constructor(private encargadoService: EncargadoService, private periodoService: PeriodoService, private activatedRoute: ActivatedRoute, private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
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
        Swal.fire('Encargado de Laboratorio Ingresado', `Encargado ${encargado.nombre} - ${encargado.apellido} ingresado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al ingresar encargado', 'error');
      }
    )
  }

  eliminarEncargado(id: number): void {
    this.encargadoService.eliminar(id)
      .subscribe(() => {
        //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        Swal.fire('Periodo eliminado', 'Periodo eliminado con exito', 'success');
      })
  }
  
  editarEncargado(): void {
    this.encargados = false
    this.activatedRoute.params.subscribe(params => {
      let id = params['idEncargado']
      if (id) {
        this.encargadoService.listarPorId(id).subscribe((encargado) => this.encargadoLaboratorio = encargado)
      }
    }, error => {
      Swal.fire('Error', 'Error al actualizar', 'error');
    })
  }

}
