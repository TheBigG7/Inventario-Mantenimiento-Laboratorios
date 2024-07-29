import { Component, OnInit } from '@angular/core';
import { Laboratorio } from './laboratorio';
import { LaboratorioService } from './laboratorio.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

//primero instalamos esto npm install jspdf jspdf-autotable despues importamos
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; //para generar tablas facilmente

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
        `${laboratorio.num_maquinas} ${laboratorio.proyector} ${laboratorio.idLaboratorio}`.toLowerCase();
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
      this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.idLaboratorio !== id);
      this.laboratoriosFiltrados = this.laboratoriosFiltrados.filter(laboratorio => laboratorio.idLaboratorio !== id);
      this.router.navigate(['/dashboarda/laboratorios']);
      Swal.fire('Laboratorio eliminado', 'Laboratorio eliminado con exito', 'success');
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
    doc.text('Reporte de los Laboratorios', 105, 30, {
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
    doc.text('Generado por: Sistema de Gestión de Laboratorios', 20, 55);

    // Línea horizontal azul
    doc.setDrawColor(blue);
    doc.setLineWidth(0.5);
    doc.line(20, 60, 190, 60);

    // Datos de la tabla
    const header = [
      [
        'ID',
        '# Laboratorio',
        '# Equipo'
      ],
    ];
    const data = this.laboratoriosFiltrados.map((laboratorio) => [
      laboratorio.idLaboratorio,
      laboratorio.num_maquinas,
      laboratorio.proyector
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
    doc.save('Reporte_de_Laboratorios.pdf');
  
  }
}