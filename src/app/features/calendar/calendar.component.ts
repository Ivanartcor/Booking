// src/app/calendar/calendar.component.ts

import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';  // Importar CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid';  // Importar dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction';  // Importar interactionPlugin

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  // Vista inicial (mensual)
    plugins: [dayGridPlugin, interactionPlugin],  // Asegúrate de agregar interactionPlugin
    events: [
      { title: 'Evento 1', date: '2025-01-20' },  // Evento de ejemplo
      { title: 'Evento 2', date: '2025-01-25' }
    ],
    // Aquí agregamos el evento dateClick de manera correcta
    dateClick: (info: { dateStr: string }) => {  // Asegúrate de que info tenga el tipo correcto
      alert('Fecha seleccionada: ' + info.dateStr);
    }
  };

  constructor() { }

  ngOnInit(): void { }
}
