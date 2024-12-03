import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from 'src/app/layouts/client-layout/client-layout.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'client-dashboard', component: ClientDashboardComponent },
      { path: 'client-profile', component: ClientProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
