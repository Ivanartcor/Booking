import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from 'src/app/layouts/company-layout/company-layout.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent,
    children: [
      { path: 'company-dashboard', component: CompanyDashboardComponent },
      { path: 'company-profile', component: CompanyProfileComponent },
      { path: '', redirectTo: 'company-dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
