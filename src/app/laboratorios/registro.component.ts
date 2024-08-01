import { Component, OnInit } from '@angular/core';
import { Laboratorio } from './laboratorio';
import { LaboratorioService } from './laboratorio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Equipo } from '../equipos/equipo';
import { AdministradorTIC } from '../login/administradorTIC';
import { Periodo } from '../periodo';
import { PeriodoService } from '../super-ad/periodo.service';
import { AdministradorService } from '../login/administrador.service';
import { EncargadoLaboratorio } from '../login/encargadoLaboratorio';
import { EncargadoService } from '../login/encargado.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  laboratorio: Laboratorio = {
    idLaboratorio: '',
    num_maquinas: 0,
    proyector: '',
    equipos: [],
    administradores: [],
    periodos: [],
    encargados: []
  }

  public isEditing: boolean = false; // Bandera para el modo de edición
  public administradoresTICs: AdministradorTIC[] = [];
  public periodoL: Periodo[] = [];
  public encargadoL: EncargadoLaboratorio[] = [];

  constructor(private laboratorioService: LaboratorioService, private router: Router,
    private activitedRouter: ActivatedRoute, private location: Location,
    private periodoService: PeriodoService, private administradorService: AdministradorService,
    private encargadoService: EncargadoService) { }

  ngOnInit(): void {
    this.cargarLaboratorio()

    this.periodoService.listarPeriodos().subscribe(
      periodo => { this.periodoL = periodo; console.log(this.periodoL); }, Error => {
        Swal.fire('Error', 'Error al listar', 'error');
      }
    )

    this.administradorService.listarAdmin().subscribe(
      admin => this.administradoresTICs = admin
    )

    this.encargadoService.listar().subscribe(
      encargado => { this.encargadoL = encargado; console.log(this.encargadoL); }, Error => {
        Swal.fire('Error', 'Error al listar', 'error');
      }
    )
  }

  cancel() {
    //this.location.back();
    this.router.navigate(['/dashboarda/laboratorios']); // Navega a la página anterior
    Swal.fire('Laboratorio no Guardado', `Laboratorio no guardado`, 'error')
  }

  cargarLaboratorio(): void {
    this.activitedRouter.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.isEditing = true; // Modo de edición
        this.laboratorioService.getLaboratorio(id).subscribe((laboratorio) => {
          this.laboratorio = laboratorio;
          console.log(this.laboratorio); // Verifica el objeto cargado
        });
      } else {
        this.isEditing = false; // Modo de creación
      }
    });
  }
  /* public create(): void {
    this.laboratorioService.create(this.laboratorio)
      .subscribe({
        next: laboratorio => {
          this.router.navigate(['/dashboarda/laboratorios']);
          Swal.fire('Laboratorio guardado', `Laboratorio ${laboratorio.idLaboratorio} guardado con éxito`, 'success');
        },
        error: err => {
          Swal.fire('Error', err, 'error');
        }
      });
  } */

  create(): void {
    this.laboratorioService.create(this.laboratorio).subscribe(
      admin => {
        this.router.navigate(['/dashboarda/laboratorios']);
        Swal.fire('Laboratorio  Guardado', `Laboratorio ${admin.idLaboratorio} Guardado con exito`, 'success')
      },
      error => {
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    )
  }
}

