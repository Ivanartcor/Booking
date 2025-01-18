// src/app/calendar/calendar-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent }  // Ruta para el CalendarComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Usamos forChild ya que este es un módulo hijo
  exports: [RouterModule]  // Exportamos el RouterModule para que sea accesible fuera de este módulo
})
export class CalendarRoutingModule { }
