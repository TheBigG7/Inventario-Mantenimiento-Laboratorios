import { Component, OnInit } from '@angular/core';
import { Laboratorio } from './laboratorio';
import { LaboratorioService } from './laboratorio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

  public laboratorio: Laboratorio = new Laboratorio()
  public isEditing: boolean = false; // Bandera para el modo de edición

  constructor(private laboratorioService: LaboratorioService, private router: Router,
    private activitedRouter: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.cargarLaboratorio()
  }

  cancel() {
    //this.location.back();
    this.router.navigate(['/dashboarda/laboratorios']); // Navega a la página anterior
    Swal.fire('Laboratorio no Guardado', `Laboratorio no guardado`, 'error')
  }

  cargarLaboratorio(): void {
    this.activitedRouter.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.isEditing = true; // Modo de edición
        this.laboratorioService.getLaboratorio(id).subscribe((laboratorio) => this.laboratorio = laboratorio)
      } else {
        this.isEditing = false; // Modo de creación
      }
    })
  }

  public create(): void {
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
  }
}

