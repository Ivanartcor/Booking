import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.scss']
})
export class CreateAppointmentModalComponent implements OnInit {
  @Input() serviceId!: number;
  @Input() companyId!: number;
  @Input() userId!: number;
  @Output() close = new EventEmitter<void>();

  // 📌 Variables de control de datos
  appointmentDate: string = '';
  appointmentTime: string = '';
  appointmentNotes: string = '';
  availabilities: any[] = [];
  availableDays: number[] = [];

  // 📌 Variables de control de validación
  errorMessage = '';
  invalidDateMessage = '';
  invalidTimeMessage = '';
  loading = false;

  // 📌 Variables para límites de selección
  minDate: string = '';
  minTime: string = '';
  maxTime: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.loadAvailability();
    this.setMinDate();
  }

  /** ✅ Carga la disponibilidad del servicio */
  private loadAvailability(): void {
    this.serviceService.getAvailabilitiesByService(this.serviceId).subscribe(
      (availabilities) => {
        this.availabilities = availabilities;
        this.extractAvailableDays();
      },
      (error) => console.error('Error obteniendo disponibilidad:', error)
    );
  }

  /** ✅ Define la fecha mínima permitida */
  private setMinDate(): void {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  /** ✅ Extrae los días disponibles del servicio */
  private extractAvailableDays(): void {
    const dayMapping: { [key: string]: number } = {
      Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0
    };
    this.availableDays = this.availabilities.map(
      (avail) => dayMapping[avail.day_of_week as keyof typeof dayMapping]
    );
  }

  /** ✅ Maneja la selección de fecha */
  onDateChange(event: Event): void {
    this.appointmentDate = (event.target as HTMLInputElement).value;
    this.resetTimeSelection();

    const selectedDayIndex = new Date(this.appointmentDate).getDay();
    const availability = this.getAvailabilityForDay(selectedDayIndex);

    if (availability) {
      this.setAvailableTimeRange(availability.start_time, availability.end_time);
    } else {
      this.invalidateDateSelection();
    }
  }

  /** ✅ Resetea la selección de hora */
  private resetTimeSelection(): void {
    this.invalidDateMessage = '';
    this.appointmentTime = '';
    this.invalidTimeMessage = '';
  }

  /** ✅ Obtiene la disponibilidad para un día específico */
  private getAvailabilityForDay(dayIndex: number): any | null {
    const dayMapping = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
    return (
      this.availabilities.find(
        (avail) => dayMapping[avail.day_of_week as keyof typeof dayMapping] === dayIndex
      ) || null
    );
  }

  /** ✅ Establece el rango de horas permitido */
  private setAvailableTimeRange(start: string, end: string): void {
    this.minTime = start;
    this.maxTime = end;
  }

  /** ✅ Invalida la selección de fecha */
  private invalidateDateSelection(): void {
    this.appointmentDate = '';
    this.minTime = '';
    this.maxTime = '';
    this.invalidDateMessage = 'Este día no está disponible para reservas.';
  }

  /** ✅ Valida la selección de hora */
  validateSelectedTime(): void {
    this.invalidTimeMessage = '';

    if (!this.appointmentTime) {
      this.invalidTimeMessage = 'Seleccione una hora dentro del horario disponible.';
      return;
    }
  
    if (this.appointmentTime < this.minTime || this.appointmentTime > this.maxTime) {
      this.appointmentTime = this.minTime;
    this.invalidTimeMessage = `Debe seleccionar una hora entre ${this.minTime} y ${this.maxTime}.`;
    }
  }

  /** ✅ Verifica si la selección es válida */
  private isSelectionValid(): boolean {
    return Boolean(this.appointmentDate) && Boolean(this.appointmentTime);
  }

  /** ✅ Envía la cita con los datos correctos */
  createAppointment(): void {
    if (!this.isSelectionValid()) {
      this.errorMessage = 'Debes seleccionar una fecha y hora válida.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // 🔹 Formatear la fecha y hora correctamente en formato ISO
    const formattedDate = new Date(`${this.appointmentDate}T${this.appointmentTime}:00`);

    // 🔹 Asegurar que los IDs sean enteros y no strings
    const appointmentData = {
      client: { id: Number(this.userId) },  // Relación ManyToOne con User
      service: { id: Number(this.serviceId) },  // Relación ManyToOne con Service
      company: { id: Number(this.companyId) },  // Relación ManyToOne con Company
      appointment_date: formattedDate.toISOString(), // 📌 Formato ISO
      status: 'pending',
      notes: this.appointmentNotes || '',
    };

    console.log(' Enviando datos de cita:', appointmentData);

    this.appointmentService.createAppointment(appointmentData).subscribe(
      (response) => {
        this.loading = false;
        if (response) {
          alert('Cita reservada con éxito.');
          this.close.emit();
        } else {
          this.errorMessage = 'Error al reservar la cita.';
        }
      },
      (error) => {
        console.error(' Error reservando cita:', error);
        console.error(' Respuesta del servidor:', error.error);
        this.errorMessage = error.error.message || 'No se pudo reservar la cita.';
        this.loading = false;
      }
    );
  }
}
