import { Component, OnInit } from '@angular/core';
import { Repuestos } from './repuestos';
import { RepuestoService } from './repuesto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public miRepuesto: Repuestos = new Repuestos;
  public isEditing: boolean = false; // Bandera para el modo de edición

  constructor(private repuestoService: RepuestoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarRepuesto
  }

  public createRepuesto(): void {
    this.repuestoService.createRepuesto(this.miRepuesto).subscribe(
      response => this.router.navigate(['/dashboarda/repuestos/form'])
    )
  }

  cargarRepuesto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.repuestoService.getRepuestobyID(id).subscribe((miRepuesto) => this.miRepuesto = this.miRepuesto)
      }
    })
  }

  cancel() {
    this.router.navigate(['/dashboarda/repuestos']);
    Swal.fire('Repuesto no Guardado', `Repuesto no guardado`, 'error')
  }

}
