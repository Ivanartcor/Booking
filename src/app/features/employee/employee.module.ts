import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

// Importa CalendarModule para poder usar el calendario en EmployeeDashboardComponent
import { CalendarModule } from '../../features/calendar/calendar.module';


@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    CalendarModule,  // Agrega CalendarModule aquí
  ]
})
export class EmployeeModule { }

