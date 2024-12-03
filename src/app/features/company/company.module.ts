import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';


@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyProfileComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
