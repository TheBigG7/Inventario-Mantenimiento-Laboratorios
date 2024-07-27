import { Component, OnInit } from '@angular/core';
import { LaboratorioService } from '../laboratorios/laboratorio.service';

@Component({
  selector: 'app-inventario-lab',
  templateUrl: './inventario-lab.component.html',
  styleUrl: './inventario-lab.component.css'
})
export class InventarioLabComponent implements OnInit {
  laboratorios: any[] = [];

  constructor(private labService: LaboratorioService) {}

  ngOnInit(): void {
    this.getLaboratorios();
  }

  getLaboratorios(): void {
    this.labService.getLaboratorios().subscribe(
      data => this.laboratorios = data,
      error => console.error(error)
    );
  }
}
