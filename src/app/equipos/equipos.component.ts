import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Equipo } from './equipo';
import { Router } from '@angular/router';
import { EquipoService } from './equipo.service';

//primero instalamos esto npm install jspdf jspdf-autotable despues importamos
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; //para generar tablas facilmente

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
      this.router.navigate(['/dashboarda/equipos']);
      Swal.fire('Equipo eliminado', 'Equipo eliminado con exito', 'success');
    })
  }

  generatePDF() {
    const doc = new jsPDF();

    // Colores personalizados
    const blue = '#003366';
    const yellow = '#FFCC00';
    const white = '#FFFFFF';

    // Fecha y hora actual
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    
      // Fondo azul para el título y subtítulo
    doc.setFillColor(blue);
    doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');

    // Título del reporte
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(white);
    doc.text('Instituto Tecnológico Universitario del Azuay', 105, 20, {
      align: 'center',
    });

    // Subtítulo del reporte
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Reporte de Equipos de los Laboratorios', 105, 30, {
      align: 'center',
    });

    // Línea horizontal amarilla
    doc.setDrawColor(yellow);
    doc.setLineWidth(1);
    doc.line(20, 35, 190, 35);

    // Información adicional del reporte
    doc.setFontSize(12);
    doc.setTextColor(blue);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${formattedDate}`, 20, 45);
    doc.text(`Hora: ${formattedTime}`, 20, 50);
    doc.text('Generado por: Sistema de Gestión de Equipos', 20, 55);

    // Línea horizontal azul
    doc.setDrawColor(blue);
    doc.setLineWidth(0.5);
    doc.line(20, 60, 190, 60);

    // Datos de la tabla
    const header = [
      [
        'ID',
        '# Laboratorio',
        '# Equipo',
        'Procesador',
        'Ram',
        'Disco',
        'Serio Disco',
        'Modelo Disco',
        'Apps Instaladas',
        'Estado',
        'Prioridad',
      ],
    ];
    const data = this.equiposFiltrados.map((equipo) => [
      equipo.id,
      equipo.laboratorio,
      equipo.num_equipo,
      equipo.procesador,
      equipo.ram,
      equipo.capacidad_disco,
      equipo.serie_disco,
      equipo.modelo_disco,
      equipo.app_install,
      equipo.estado,
      equipo.prioridad,
    ]);

    // Configuración de la tabla
    (doc as any).autoTable({
      head: header,
      body: data,
      startY: 63, // Ajusta esta posición según sea necesario
      theme: 'striped', // Puedes cambiar el tema a 'striped' o 'plain'
      styles: { fontSize: 10 },
      headStyles: { fillColor: blue, textColor: white },
      margin: { top: 10 },
    });

    // Pie de página
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(blue);
    doc.text('Página 1 de 1', 105, doc.internal.pageSize.height - 10, {
      align: 'center',
    });

    // Guarda el PDF
    doc.save('Reporte_de_Maquinas_para_Mantenimiento.pdf');
  }

}