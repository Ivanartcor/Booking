import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.scss']
})
export class ClientAppointmentsComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // Emite un evento para notificar el cierre
  }
}
