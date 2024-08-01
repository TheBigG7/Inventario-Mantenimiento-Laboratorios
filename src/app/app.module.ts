import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { DashboardEComponent } from './dashboard-e/dashboard-e.component';
import { FormularioLComponent } from './login/formulario-l/formulario-l.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EncargadosComponent } from './encargados/encargados.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { RegistroComponent } from './laboratorios/registro.component';
import { Location } from '@angular/common';
import { SuperAdComponent } from './super-ad/super-ad.component';
import { EquiposComponent } from './equipos/equipos.component';
import { FormuComponent } from './equipos/formu.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReportesComponent } from './reportes/reportes.component';
import { InicioComponent } from './inicio/inicio.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { FormComponent } from './repuestos/form.component';
import { InventarioLabComponent } from './inventario-lab/inventario-lab.component';
import { LabEquiposComponent } from './inventario-lab/lab-equipos/lab-equipos.component';
import { SuperAccesoComponent } from './super-acceso/super-acceso.component';
import { PeriodosComponent } from './super-ad/periodos/periodos.component';
import { FormPeriodoComponent } from './super-ad/periodos/form-periodo.component';
import { AdminsComponent } from './super-ad/admins/admins.component';
import { FormAdminsComponent } from './super-ad/admins/form-admins.component';
import { FormEncargadoComponent } from './encargados/form-encargado.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAComponent,
    DashboardEComponent,
    FormularioLComponent,
    FooterComponent,
    EncargadosComponent,
    LaboratoriosComponent,
    RegistroComponent,
    SuperAdComponent,
    EquiposComponent,
    FormuComponent,
    ReportesComponent,
    InicioComponent,
    RepuestosComponent,
    FormComponent,
    InventarioLabComponent,
    LabEquiposComponent,
    SuperAccesoComponent,
    PeriodosComponent,
    FormPeriodoComponent,
    AdminsComponent,
    FormAdminsComponent,
    FormEncargadoComponent,
    MantenimientoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
