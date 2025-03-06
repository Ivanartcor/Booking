import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from 'src/app/layouts/company-layout/company-layout.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { CompanyEmployeesComponent } from './components/company-employees/company-employees.component';
import { CompanyEmployeesDetailsComponent } from './components/company-employees-details/company-employees-details.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent,
    children: [
      { path: 'company-dashboard', component: CompanyDashboardComponent },
      { path: 'company-profile', component: CompanyProfileComponent },
      { path: 'company-employees', component: CompanyEmployeesComponent },
      { path: 'employee/:id', component: CompanyEmployeesDetailsComponent },
      { path: 'services/:id', component: ServiceDetailsComponent },
      { path: '', redirectTo: 'company-dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
