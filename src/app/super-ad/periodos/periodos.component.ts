import { Component, OnInit } from '@angular/core';
import { Periodo } from '../../periodo';
import { PeriodoService } from '../periodo.service';
import { CredencialService } from '../../super-acceso/credencial.service';
import { ActivatedRoute } from '@angular/router';
import { CredencialSuperAcceso } from '../../super-acceso/CredencialSuperAcceso';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrl: './periodos.component.css'
})
export class PeriodosComponent implements OnInit{
  adminOn: boolean = false
  administrador: boolean = true
  periodoOn: boolean = true


  periodoL: Periodo[]

  constructor(private periodoService: PeriodoService, private credencialS: CredencialService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.periodoService.listarPeriodos().subscribe(
      (periodo :Periodo[]) => { this.periodoL = periodo; console.log(this.periodoL); }, error => {
        Swal.fire('Error', 'Error al listar', 'error');
      }
    )
    /* this.periodoService.listarPorId(2).subscribe(
      (periodo: Periodo) => {
        console.log('Periodo específico:', periodo);
      },
      (error) => {
        console.error('Error al obtener el periodo específico', error);
      }) */
  }

  eliminarPeriodo(id: number): void {

    this.periodoService.eliminarPeriodo(id)
      .subscribe(() => {
        //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        Swal.fire('Periodo eliminado', 'Periodo eliminado con exito', 'success');
      })
      this.periodoService.listarPeriodos().subscribe(
        (periodo :Periodo[]) => { this.periodoL = periodo; console.log(this.periodoL); }, error => {
          Swal.fire('Error', 'Error al listar', 'error');
        }
      )
  }
  
}
