import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientAppointmentsComponent } from './components/client-appointments/client-appointments.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { FormsModule } from '@angular/forms';
import { SharedCookiesModule } from 'src/app/shared-cookies/shared-cookies.module';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientProfileComponent,
    ClientAppointmentsComponent,
    CompanyDetailsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    SharedCookiesModule
  ],
  exports: [
    ClientAppointmentsComponent, 
  ],
})
export class ClientModule { }
