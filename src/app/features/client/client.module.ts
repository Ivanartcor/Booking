import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientAppointmentsComponent } from './components/client-appointments/client-appointments.component';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientProfileComponent,
    ClientAppointmentsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  exports: [
    ClientAppointmentsComponent, // Exportación
  ],
})
export class ClientModule { }
