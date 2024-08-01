import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from './mantenimiento';
import { MantenimientoService } from './mantenimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.css'
})
export class MantenimientoComponent implements OnInit{

  mantenimientoForm: FormGroup;
  mantenimientos: Mantenimiento[];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mantenimientoService: MantenimientoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadMantenimientos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadMantenimiento(+id);
    }
  }

  initForm(): void {
    this.mantenimientoForm = this.fb.group({
      id: [''],
      equipo: this.fb.group({
        id: [''],
        nombre: ['']
      }),
      repuesto: this.fb.array([]),
      fechaMant: ['', Validators.required],
      nombreEncargado: ['', Validators.required]
    });
  }

  loadMantenimientos(): void {
    this.mantenimientoService.getMantenimientos().subscribe(data => {
      this.mantenimientos = data;
    });
  }

  loadMantenimiento(id: number): void {
    this.mantenimientoService.getMantenimiento(id).subscribe(data => {
      this.mantenimientoForm.patchValue(data);
    });
  }

  onSubmit(): void {
    const mantenimiento: Mantenimiento = this.mantenimientoForm.value;
    if (this.isEditMode) {
      this.mantenimientoService.updateMantenimiento(mantenimiento.id, mantenimiento).subscribe(() => {
        this.router.navigate(['/mantenimientos']);
      });
    } else {
      this.mantenimientoService.createMantenimiento(mantenimiento).subscribe(() => {
        this.loadMantenimientos();
        this.mantenimientoForm.reset();
      });
    }
  }

  onEdit(mantenimiento: Mantenimiento): void {
    this.isEditMode = true;
    this.mantenimientoForm.patchValue(mantenimiento);
  }

  onDelete(id: number): void {
    this.mantenimientoService.deleteMantenimiento(id).subscribe(() => {
      this.loadMantenimientos();
    });
  }

  onCancel(): void {
    this.isEditMode = false;
    this.mantenimientoForm.reset();
  }

}
