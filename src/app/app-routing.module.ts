import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioLComponent } from './login/formulario-l/formulario-l.component';
import { LoginComponent } from './login/login.component';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { DashboardEComponent } from './dashboard-e/dashboard-e.component';
import { EncargadosComponent } from './encargados/encargados.component';
import { FooterComponent } from './footer/footer.component';


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
      { path: 'crear-encargados', component: EncargadosComponent }
    ]
  },
  { path: 'dashboarde', component: DashboardEComponent },
  { path: 'footer', component: FooterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
