import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Equipo } from '../equipos/equipo';
import { Router } from '@angular/router';
import { EquipoService } from '../equipos/equipo.service'; 
import { MatButtonToggleChange } from '@angular/material/button-toggle';

//primero instalamos esto npm install jspdf jspdf-autotable despues importamos
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; //para generar tablas facilmente


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {


  equipos: Equipo[] = [];
  equipo: Equipo = {
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
    laboratorio: '',
  };
  public equiposFiltrados: Equipo[] = [];
  public filtro: string = '';
  prioridadSeleccionada = '';

  constructor(private equipoService: EquipoService, private router: Router) { }

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

  filtroPrioridad(event: MatButtonToggleChange) {
    if (event.value === 'limpiar') {
      this.prioridadSeleccionada = '';
      this.equiposFiltrados = this.equipos;
      event.source.checked = false;
    } else {
      this.prioridadSeleccionada = event.value;
      this.equiposFiltrados = this.equipos.filter(equipo => {
        if (equipo && equipo.prioridad) {
          if (event.value === 'Alta') {
            return equipo.prioridad === 'Alta';
          } else if (event.value === 'Media') {
            return equipo.prioridad === 'Media';
          } else if (event.value === 'Baja') {
            return equipo.prioridad === 'Baja';
          }
        }
        return false;
      });
    }
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
    doc.text('Reporte de Maquinas en Mantenimiento', 105, 30, {
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
    doc.text('Generado por: Sistema de Mantenimiento', 20, 55);

    // Línea horizontal azul
    doc.setDrawColor(blue);
    doc.setLineWidth(0.5);
    doc.line(20, 60, 190, 60);

    // Datos de la tabla
    const header = [
      [
        '# Laboratorio',
        '# Equipo',
        'Descripcion',
        'Prioridad',
      ],
    ];
    const data = this.equiposFiltrados.map((equipo) => [
      equipo.laboratorio,
      equipo.num_equipo,
      equipo.num_equipo,
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
    doc.save('Reporte_para_Mantenimiento.pdf');
  }
}
