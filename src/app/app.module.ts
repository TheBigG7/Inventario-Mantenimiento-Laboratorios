import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { DashboardEComponent } from './dashboard-e/dashboard-e.component';
import { FormularioLComponent } from './login/formulario-l/formulario-l.component';
import { FormsModule } from '@angular/forms';
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
    FormuComponent

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
    MatCardModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
