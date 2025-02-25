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
  userId: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userId = currentUser.id;
      this.loadAppointments();
    }
  }

  /** 🔹 Cargar citas del cliente */
  loadAppointments(): void {
    if (!this.userId) return;

    this.appointmentService.getAppointmentsByClient(this.userId).subscribe((appointments) => {
      this.appointments = appointments.map((appointment) => ({
        ...appointment,
        companyName: appointment.company?.name || 'Desconocida',
        serviceName: appointment.service?.name || 'Desconocido',
        price: appointment.service?.price || 0,
        date: new Date(appointment.appointmentDate).toLocaleDateString(),
        time: new Date(appointment.appointmentDate).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: appointment.status || 'pending', // Estado de la cita
      }));
    });
  }

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }

  /** 🔹 Cancelar cita con confirmación */
  cancelAppointment(appointmentId: number): void {
    const confirmCancel = confirm(`¿Estás seguro de que quieres cancelar la cita ID ${appointmentId}?`);
    
    if (confirmCancel) {
      this.appointmentService.cancelAppointment(appointmentId).subscribe((success: boolean) => {
        if (success) {
          this.appointments = this.appointments.filter((appointment) => appointment.id !== appointmentId);
          alert(`Cita con ID: ${appointmentId} ha sido cancelada con éxito.`);
        } else {
          alert(`Error al cancelar la cita con ID: ${appointmentId}.`);
        }
      });
    }
  }
}
