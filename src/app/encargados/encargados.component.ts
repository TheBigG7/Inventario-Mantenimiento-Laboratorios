import { Component, OnInit } from '@angular/core';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import { E } from '@angular/cdk/keycodes';
import { Laboratorio } from '../laboratorios/laboratorio';
import { EncargadoService } from '../login/encargado.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    rol: 'encargado',
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

  constructor(private encargadoService: EncargadoService, private router: Router, private periodoService: PeriodoService, private activatedRoute: ActivatedRoute, private laboratorioService: LaboratorioService) { }

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


  eliminarEncargado(id: number): void {
    this.encargadoService.eliminar(id)
      .subscribe(() => {
        this.router.navigate(['/crear-encargados'])
        //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        Swal.fire('Periodo eliminado', 'Periodo eliminado con exito', 'success');
      })
  }



}
