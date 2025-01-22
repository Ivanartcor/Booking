import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';  // Importar CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid';  // Importar dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction';  // Importar interactionPlugin
import esLocale from '@fullcalendar/core/locales/es';  // Importar la localización en español

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  // Vista inicial (mensual)
    plugins: [dayGridPlugin, interactionPlugin],  // Asegúrate de agregar interactionPlugin
    locale: esLocale,  // Configurar el idioma a español
    events: [
      { title: 'Evento 1', date: '2025-01-20' },  // Evento de ejemplo
      { title: 'Evento 2', date: '2025-01-25' }
    ],
    // Mostrar solo el número del día
    dayCellContent: function(info) {
      return info.date.getDate().toString();  // Solo el número del día
    },
    dateClick: (info: { dateStr: string }) => {
      alert('Fecha seleccionada: ' + info.dateStr);
    }
  };

  constructor() { }

  ngOnInit(): void { }
}
