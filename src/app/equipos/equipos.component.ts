import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Equipo } from './equipo';
import { Router } from '@angular/router';
import { EquipoService } from './equipo.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent implements OnInit{

  equipos: Equipo[] = [];
  public equiposFiltrados: Equipo[] = [];
  public filtro: string = '';

  constructor(private equipoService: EquipoService, private router: Router) { }

  /*ngOnInit(): void {

    this.equipoService.getEquipos().subscribe(
      equipos => this.equipos = equipos
    )

    this.equiposFiltrados();

  }*/

  ngOnInit(): void {
    this.cargarEquipos();
    this.filtrarEquipo();
  }

  filtrarEquipo(): void {
    this.equiposFiltrados = this.equipos.filter((equipo) => {
      const textoBusqueda =
        `${equipo.laboratorio} ${equipo.num_equipo} ${equipo.procesador} ${equipo.ram} ${equipo.capacidad_disco} 
       ${equipo.serie_disco} ${equipo.modelo_disco} ${equipo.app_install} ${equipo.estado} ${equipo.prioridad}`.toLowerCase();
      return textoBusqueda.includes(this.filtro.toLowerCase());
    });
  }

  borrarFiltro(): void {
    this.filtro = '';
    this.filtrarEquipo();
  }

cargarEquipos() {
  this.equipoService.getEquipos().subscribe(
    equipos => {
      this.equipos = equipos;
      this.equiposFiltrados = equipos;
    },
    error => {
      console.error('Error al cargar usuarios:', error);
    });
  }
  
  public delete(id: number): void {
    console.log("ha realizado un clik")

    this.equipoService.deleteEquipo(id)
    .subscribe(() => {
      //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
      this.equipos = this.equipos.filter(equipo => equipo.id !== id);
            this.equiposFiltrados = this.equiposFiltrados.filter(equipo => equipo.id !== id);
      this.router.navigate(['/equipos']);
      Swal.fire('Equipo eliminado', 'Equipo eliminado con exito', 'success');
    })
  }
}
