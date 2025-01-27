import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importar CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid'; // Importar dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Importar interactionPlugin
import esLocale from '@fullcalendar/core/locales/es'; // Importar la localización en español

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Vista inicial (mensual)
    plugins: [dayGridPlugin, interactionPlugin], // Plugins necesarios
    locale: esLocale, // Configuración de idioma en español
    headerToolbar: {
      left: 'prev,next today', // Botones de navegación
      center: 'title', // Título centrado
      right: '', // Eliminar el botón de vista
    },
    events: [
      { title: 'Evento 1', date: '2025-01-20' },
      { title: 'Evento 2', date: '2025-01-25' },
    ],
    titleFormat: {
      year: 'numeric',
      month: '2-digit', // Forzar el mes a tener siempre dos dígitos
    },
    // Mostrar solo el número del día
    dayCellContent: (info) => info.date.getDate().toString(),
    dateClick: (info: { dateStr: string }) => {
      alert('Fecha seleccionada: ' + info.dateStr);
    },
    contentHeight: 'auto', // Ajustar altura
    aspectRatio: 1.5, // Relación de aspecto para un tamaño adecuado
    // Evitar que se recorte el contenido
    nowIndicator: true,
  };

  constructor() {}

  ngOnInit(): void {}
}
