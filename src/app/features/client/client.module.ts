import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
