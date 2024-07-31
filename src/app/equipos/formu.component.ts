import { Component, OnInit } from '@angular/core';
import { Equipo } from './equipo';
import { Laboratorio } from '../laboratorios/laboratorio';
import { EquipoService } from './equipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratorioService } from '../laboratorios/laboratorio.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { EmailService } from '../equipos/email.service';

@Component({
  selector: 'app-formu',
  templateUrl: './formu.component.html',
  styleUrls: ['./formu.component.css']
})
export class FormuComponent implements OnInit{

  public equipo: Equipo = {
    idEquipo: 0,
    num_equipo: 0,
    procesador: '',
    ram: '',
    capacidad_disco: '',
    serie_disco: '',
    modelo_disco: '',
    estado: '',
    app_install: '',
    prioridad: '',
    laboratorio: null
  }
  public titulo:string = "Crear Equipo"
  public isEditing: boolean = false; // Bandera para el modo de edición
  public laboratorios: Laboratorio[] = [];  // <-- Variable para almacenar los laboratorios


  constructor(private equipoService: EquipoService, private router: Router,
    private activitedRouter: ActivatedRoute, private location: Location,
    private laboratorioService: LaboratorioService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.cargarEquipo()
    this.cargarLaboratorios()
  }

  cargarLaboratorios(): void {
    this.laboratorioService.getLaboratoriosId().subscribe(laboratorios => {
      this.laboratorios = laboratorios;
    });
  }

  cancel() {
    //this.location.back();
    this.router.navigate(['/dashboarda/equipos']); // Navega a la página anterior
    Swal.fire('Equipo no Guardado', `Equipo no guardado`, 'error')
  }

  cargarEquipo(): void {
    this.activitedRouter.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.isEditing = true; // Modo de edición
        this.equipoService.getEquipo(id).subscribe((equipo) => this.equipo = equipo)
      } else {
        this.isEditing = true; // Modo de creación, true para que el ususrio no dijite el id
        this.equipoService.getUltimoId().subscribe((ultimoId) => {
          this.equipo.idEquipo = ultimoId + 1;
        });
      }
    })
  }

  public create(): void {
    console.log("Has realizado un click");
    console.log(this.equipo);

    this.equipoService.create(this.equipo).subscribe(equipo => {
      this.router.navigate(['/dashboarda/equipos']);
      Swal.fire('Equipo guardado', `Equipo ${equipo.num_equipo} guardado con éxito`, 'success');

      // Enviar correo si la prioridad es alta
      if (this.equipo.prioridad === 'Alta') {
        this.emailService.sendAlertEmail(this.equipo).subscribe(
          (emailResponse: any) => {
            console.log('Correo de alerta enviado:', emailResponse);
          },
          (emailError: any) => {
            console.error('Error al enviar el correo de alerta:', emailError);
          }
        );
      }
    });
  }
}
