import { Component, OnInit } from '@angular/core';
import { RepuestoService } from './repuesto.service';
import { Repuestos } from './repuestos';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.css']
})
export class RepuestosComponent implements OnInit {

  miRepuesto: Repuestos[] = [];
  public repuestosFiltrados: Repuestos[] = [];
  public filtro: String = '';


  constructor(private repuestoService: RepuestoService, private router: Router) { }

  ngOnInit() {
    this.cargarRepuestos();
    this.filtrarRepuestos();
  }

  cargarRepuestos() {
    this.repuestoService.requestRepuestos().subscribe(
      repuesto => {
        this.miRepuesto = repuesto;
        this.repuestosFiltrados = repuesto;
      }, error => {
        console.error('Error al cargar Repuestos:', error);
      });
  }

  public deleteRepuesto(id: number): void {

    this.repuestoService.deleteRepuesto(id)
    .subscribe(() => {
      this.miRepuesto = this.miRepuesto.filter(repuesto => repuesto.id !== id);
      this.repuestosFiltrados = this.repuestosFiltrados.filter(repuesto => repuesto.id !== id);
      this.router.navigate(['/dashboarda/repuestos']);
      Swal.fire('Repuesto eliminado', 'Repuesto eliminado con exito', 'success');
    })
  }

  filtrarRepuestos(): void {
    this.repuestosFiltrados = this.miRepuesto.filter((repuesto) => {
      const textoBusqueda =
        `${repuesto.nombre} ${repuesto.marca} ${repuesto.modelo} ${repuesto.id}`.toLowerCase();
      return textoBusqueda.includes(this.filtro.toLowerCase());
    });
  }

  borrarFiltro(): void {
    this.filtro = '';
    this.filtrarRepuestos();
  }
}
