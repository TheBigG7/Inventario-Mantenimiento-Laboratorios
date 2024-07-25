import { Component, OnInit } from '@angular/core';
import { Laboratorio } from './laboratorio';
import { LaboratorioService } from './laboratorio.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrl: './laboratorios.component.css'
})
export class LaboratoriosComponent implements OnInit{

  laboratorios: Laboratorio[] = [];
  public laboratoriosFiltrados: Laboratorio[] = [];
  public filtro: String = '';

  constructor(private laboratorioService: LaboratorioService, private router: Router) {}

  ngOnInit(): void {
    
    this.cargarLaboratorios();
    this.filtrarLaboratorio();
  }

  filtrarLaboratorio(): void {
    this.laboratoriosFiltrados = this.laboratorios.filter((laboratorio) => {
      const textoBusqueda =
        `${laboratorio.num_maquinas} ${laboratorio.proyector} ${laboratorio.id}`.toLowerCase();
      return textoBusqueda.includes(this.filtro.toLowerCase());
    });
  }

  borrarFiltro(): void {
    this.filtro = '';
    this.filtrarLaboratorio();
  }

cargarLaboratorios() {
  this.laboratorioService.getLaboratorios().subscribe(
    laboratorios => {
      this.laboratorios = laboratorios;
      this.laboratoriosFiltrados = laboratorios;
    },
    error => {
      console.error('Error al cargar usuarios:', error);
    });
  }
  
  public delete(id: String): void {
    console.log("ha realizado un clik")

    this.laboratorioService.deleteLaboratorio(id)
    .subscribe(() => {
      //this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.id !== id);
      this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.id !== id);
      this.laboratoriosFiltrados = this.laboratoriosFiltrados.filter(laboratorio => laboratorio.id !== id);
      this.router.navigate(['/dashboarda/laboratorios']);
      Swal.fire('Laboratorio eliminado', 'Laboratorio eliminado con exito', 'success');
    })
  }
}