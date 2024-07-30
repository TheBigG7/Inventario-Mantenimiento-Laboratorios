import { Component, OnInit } from '@angular/core';
import { LabEquipoService } from './lab-equipo.service';
import { ActivatedRoute } from '@angular/router';
import { EquipoService } from '../../equipos/equipo.service';
import { Equipo } from '../../equipos/equipo';

@Component({
  selector: 'app-lab-equipos',
  templateUrl: './lab-equipos.component.html',
  styleUrl: './lab-equipos.component.css'
})
export class LabEquiposComponent implements OnInit {
  
  labId: string = '';
  equipos: Equipo[] = [];
  public equiposFiltrados: Equipo[] = [];
  public filtro: string = '';

  constructor(private route: ActivatedRoute, private equipoService: EquipoService) { }

  ngOnInit(): void {
    this.labId = this.route.snapshot.paramMap.get('id') ?? '';

    this.cargarEquipos();
  }

  cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe(
      data => {
        this.equipos = data;
        this.filtrarEquipo();
      },
      error => console.error(error)
    );
  }

  filtrarEquipo(): void {
    this.equiposFiltrados = this.equipos.filter((equipo) => {
      const textoBusqueda =
        `${equipo.laboratorio}`.toLowerCase();
      return textoBusqueda.includes(this.filtro.toLowerCase()) && equipo.laboratorio?.idLaboratorio === this.labId;
    });
  }
}
