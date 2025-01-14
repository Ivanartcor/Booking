import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { FormsModule } from '@angular/forms';
import { CompanyEmployeesComponent } from './components/company-employees/company-employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';


@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyProfileComponent,
    ServiceCardComponent,
    ServiceDetailsComponent,
    AddServiceComponent,
    CompanyEmployeesComponent,
    AddEmployeeComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
