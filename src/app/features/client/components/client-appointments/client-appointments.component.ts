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
  loading = true;
  errorMessage = '';

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

  /** ✅ Mapea el estado de la cita a español */
getAppointmentStatusInSpanish(status: string): string {
  const statusMap: { [key: string]: string } = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    canceled: 'Cancelada',
    completed: 'Completada',
    rescheduled: 'Reprogramada'
  };
  return statusMap[status] || 'Desconocido';
}

/** ✅ Mapea el estado del pago a español */
getPaymentStatusInSpanish(status: string): string {
  const paymentMap: { [key: string]: string } = {
    paid: 'Pagado',
    pending: 'Pendiente de pago',
    refunded: 'Reembolsado'
  };
  return paymentMap[status] || 'No especificado';
}

/** ✅ Mapea el método de pago a español */
getPaymentMethodInSpanish(method: string | null): string {
  const methodMap: { [key: string]: string } = {
    credit_card: 'Tarjeta de Crédito',
    paypal: 'PayPal',
    bank_transfer: 'Transferencia Bancaria',
    cash: 'Efectivo'
  };
  return method ? methodMap[method] || 'No especificado' : 'No especificado';
}

  /** ✅ Cargar citas del cliente */
  loadAppointments(): void {
    if (!this.userId) return;
  
    this.appointmentService.getAppointmentsByClient(this.userId).subscribe(
      (appointments) => {
        this.appointments = appointments.map((appointment) => ({
          id: appointment.id,
          companyName: appointment.company?.name || 'Desconocida',
          companyLogo: appointment.company?.logo || '/assets/images/default-company.png',
          serviceName: appointment.service?.name || 'Desconocido',
          price: appointment.service?.price ? parseFloat(appointment.service.price).toFixed(2) : '0.00',
          date: new Date(appointment.appointment_date).toLocaleDateString(),
          time: new Date(appointment.appointment_date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          status: this.getAppointmentStatusInSpanish(appointment.status),
          paymentMethod: this.getPaymentMethodInSpanish(appointment.payment_method),
          paymentStatus: this.getPaymentStatusInSpanish(appointment.payment_status)
        }));
        this.loading = false;
      },
      (error) => {
        console.error('Error obteniendo citas:', error);
        this.errorMessage = 'Error al cargar las citas.';
        this.loading = false;
      }
    );
  }

  /** ✅ Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }

  /** ✅ Cancelar cita con confirmación */
  cancelAppointment(appointmentId: number): void {
    const confirmCancel = confirm(`¿Estás seguro de que quieres cancelar la cita?`);
    
    if (confirmCancel) {
      this.appointmentService.cancelAppointment(appointmentId).subscribe((success: boolean) => {
        if (success) {
          this.appointments = this.appointments.filter((appointment) => appointment.id !== appointmentId);
          alert(`Cita cancelada con éxito.`);
        } else {
          alert(`Error al cancelar la cita.`);
        }
      });
    }
  }
}
