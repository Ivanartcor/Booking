import { Component, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.scss']
})
export class ClientAppointmentsComponent {
  @Output() close = new EventEmitter<void>();

  appointments: any[] = [];
/*
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
      company: 'Mazón',
      service: 'Corte de pelo',
      price: 16.0,
      date: new Date(2024, 8, 17),
      time: '10:15'
    },
    {
      id: 3,
      company: 'Empresa',
      service: 'Corte de pelo',
      price: 12222.0,
      date: new Date(2024, 8, 18),
      time: '5:15'
    }
  ];
  */

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.loadAppointments(currentUser.id);
    }
  }

  loadAppointments(clientId: number): void {
    this.appointmentService.getAppointmentsByClient(clientId).subscribe((appointments) => {
      this.appointments = appointments.map((appointment) => ({
        ...appointment,
        date: new Date(appointment.appointmentDate).toLocaleDateString(),
        time: new Date(appointment.appointmentDate).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
    });
  }


  closeModal() {
    this.close.emit(); // Emite un evento para notificar el cierre
  }
  
  cancelAppointment(appointmentId: number): void {
    this.appointmentService.cancelAppointment(appointmentId).subscribe((success) => {
      if (success) {
        this.appointments = this.appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
      }
    });
    alert(`Cita con ID: ${appointmentId} ha sido cancelada.`);
  }
}
