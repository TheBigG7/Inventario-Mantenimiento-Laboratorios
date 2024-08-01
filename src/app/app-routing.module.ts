import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioLComponent } from './login/formulario-l/formulario-l.component';
import { LoginComponent } from './login/login.component';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { DashboardEComponent } from './dashboard-e/dashboard-e.component';
import { EncargadosComponent } from './encargados/encargados.component';
import { FooterComponent } from './footer/footer.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { RegistroComponent } from './laboratorios/registro.component';
import { SuperAdComponent } from './super-ad/super-ad.component';
import { EquiposComponent } from './equipos/equipos.component';
import { FormuComponent } from './equipos/formu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { FormComponent } from './repuestos/form.component';
import { InventarioLabComponent } from './inventario-lab/inventario-lab.component';
import { LabEquiposComponent } from './inventario-lab/lab-equipos/lab-equipos.component';
import { SuperAccesoComponent } from './super-acceso/super-acceso.component';
import { AdminsComponent } from './super-ad/admins/admins.component';
import { FormAdminsComponent } from './super-ad/admins/form-admins.component';
import { PeriodosComponent } from './super-ad/periodos/periodos.component';
import { FormPeriodoComponent } from './super-ad/periodos/form-periodo.component';
import { FormEncargadoComponent } from './encargados/form-encargado.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  //{ path: 'login/formulario', component: FormularioLComponent }
  {
    path: 'login', component: LoginComponent,
    children: [
      { path: 'formulario', component: FormularioLComponent }
    ]
  },
  {
    path: 'dashboarda', component: DashboardAComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'crear-encargados', component: EncargadosComponent },
      { path: 'crear-encargados/form-encargado', component: FormEncargadoComponent },
      { path: 'crear-encargados/form-encargado/:id', component: FormEncargadoComponent },
      { path: 'laboratorios', component: LaboratoriosComponent },
      { path: 'laboratorios/form', component: RegistroComponent },
      { path: 'laboratorios/form/:id', component: RegistroComponent },
      { path: 'equipos', component: EquiposComponent },
      { path: 'equipos/form', component: FormuComponent },
      { path: 'equipos/form/:id', component: FormuComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'repuestos', component: RepuestosComponent },
      { path: 'repuestos/form', component: FormComponent },
      { path: 'repuestos/form/:id', component: FormComponent },
      { path: 'inventario-lab', component: InventarioLabComponent },
      { path: 'lab-equipo/:id', component: LabEquiposComponent }
    ]
  },
  { path: 'footer', component: FooterComponent },
  { path: 'admin', component: SuperAdComponent },
  { path: 'admin/:id', component: SuperAdComponent },
  {
    path: 'super', component: SuperAdComponent, children: [
      { path: 'ad', component: AdminsComponent },
      { path: 'ad/form', component: FormAdminsComponent },
      { path: 'ad/form/:id', component: FormAdminsComponent },
      { path: 'p', component: PeriodosComponent },
      { path: 'p/form', component: FormPeriodoComponent },
      { path: 'p/form/:id', component: FormPeriodoComponent }
    ]
  },
  {
    path: 'dashboarde', component: DashboardEComponent,
    children: [
      { path: '', redirectTo: 'inicioE', pathMatch: 'full' },
      { path: 'laboratorios', component: LaboratoriosComponent },
      { path: 'laboratorios/form', component: RegistroComponent },
      { path: 'laboratorios/form/:id', component: RegistroComponent },
      { path: 'equiposE', component: EquiposComponent },
      { path: 'equiposE/form', component: FormuComponent },
      { path: 'equiposE/form/:id', component: FormuComponent },
      { path: 'inicioE', component: InicioComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'repuestos', component: RepuestosComponent },
      { path: 'repuestos/form', component: FormComponent },
      { path: 'repuestos/form/:id', component: FormComponent },
      { path: 'inventario-lab', component: InventarioLabComponent },
      { path: 'lab-equipo/:id', component: LabEquiposComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
