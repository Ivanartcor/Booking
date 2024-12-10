import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from 'src/app/layouts/client-layout/client-layout.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientAppointmentsComponent } from './components/client-appointments/client-appointments.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'client-dashboard', component: ClientDashboardComponent },
      { path: 'client-profile', component: ClientProfileComponent },
      { path: 'client-appointments', component: ClientAppointmentsComponent },
      { path: 'company/:id', component: CompanyDetailsComponent },
      //La ruta company/:id usa un parámetro dinámico (id) para identificar la empresa seleccionada.
      { path: '', redirectTo: 'client-dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
