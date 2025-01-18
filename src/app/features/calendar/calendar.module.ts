// src/app/calendar/calendar.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importar FullCalendarModule

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule  // Importar FullCalendarModule para usar en el componente
  ],
  exports: [CalendarComponent]
})
export class CalendarModule { }

