import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.scss']
})
export class ClientAppointmentsComponent {
  @Output() close = new EventEmitter<void>();

  appointments = [
    {
      id: 1,
      company: 'Empresa',
      service: 'Corte de pelo',
      price: 12.0,
      date: new Date(2024, 8, 17), // Año, Mes (0-indexado), Día
      time: '10:15'
    },
    {
      id: 2,
      company: 'Empresa',
      service: 'Corte de pelo',
      price: 12.0,
      date: new Date(2024, 8, 17),
      time: '10:15'
    },
    {
      id: 3,
      company: 'Empresa',
      service: 'Corte de pelo',
      price: 12.0,
      date: new Date(2024, 8, 17),
      time: '10:15'
    }
  ];
  closeModal() {
    this.close.emit(); // Emite un evento para notificar el cierre
  }
  cancelAppointment(id: number) {
    // Lógica para cancelar una cita (de momento, solo remueve de la lista)
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
  }
}
