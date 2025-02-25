import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.scss']
})
export class ClientAppointmentsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  appointments: any[] = [];

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

  /** 🔹 Cargar citas del cliente */
  loadAppointments(clientId: number): void {
    this.appointmentService.getAppointmentsByClient(clientId).subscribe((appointments) => {
      this.appointments = appointments.map((appointment) => ({
        ...appointment,
        companyName: appointment.company?.name || 'Desconocida',
        serviceName: appointment.service?.name || 'Desconocido',
        price: appointment.service?.price || 0,
        date: new Date(appointment.appointment_date).toLocaleDateString(),
        time: new Date(appointment.appointment_date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
    });
  }

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }
  
  /** 🔹 Cancelar cita */
  cancelAppointment(appointmentId: number): void {
    this.appointmentService.cancelAppointment(appointmentId).subscribe((success: boolean) => {
      if (success) {
        this.appointments = this.appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
        alert(`Cita con ID: ${appointmentId} ha sido cancelada.`);
      } else {
        alert(`Error al cancelar la cita con ID: ${appointmentId}.`);
      }
    });
  }
}
