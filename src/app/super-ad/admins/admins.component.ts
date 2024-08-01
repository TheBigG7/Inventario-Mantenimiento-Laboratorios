import { Component } from '@angular/core';
import { Periodo } from '../../periodo';
import { AdministradorTIC } from '../../login/administradorTIC';
import { PeriodoService } from '../periodo.service';
import { CredencialService } from '../../super-acceso/credencial.service';
import { AdministradorService } from '../../login/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CredencialSuperAcceso } from '../../super-acceso/CredencialSuperAcceso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  adminOn: boolean = false
  administrador: boolean = true
  periodoOn: boolean = true

  administradoresTICs: AdministradorTIC[]

  constructor(private administradorService: AdministradorService, private activatedRoute: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    this.administradorService.listarAdmin().subscribe(
      (admin: AdministradorTIC[]) => { this.administradoresTICs = admin; console.log(this.administradoresTICs); }
    )
  }

  eliminarAdmin(id: number): void {
    this.administradorService.eliminarAdmin(id)
      .subscribe(() => {
        //this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        Swal.fire('Periodo eliminado', 'Periodo eliminado con exito', 'success');
      })
  }
}
