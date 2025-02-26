import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { CategoryService } from 'src/app/core/services/category.service';



/** 🔹 Modelo de disponibilidad dentro del componente */
class ServiceAvailability {
  id?: number;
  serviceId: number;
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  startTime: string;
  endTime: string;

  constructor(serviceId: number, dayOfWeek: string, startTime: string, endTime: string) {
    this.serviceId = serviceId;
    this.dayOfWeek = dayOfWeek as any;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {
  @Input() serviceId!: number;
  @Input() companyId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() serviceUpdated = new EventEmitter<any>();


  
  service = {
    name: '',
    description: '',
    price: 0,
    durationMinutes: 0,
    category: '',
    assignedEmployees: [] as number[],
    availability: [] as ServiceAvailability[],
    companyId: 0,
  };

  employees: any[] = [];
  categories: any[] = [];
  availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  errors: string[] = [];

  constructor(
    private serviceService: ServiceService,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadServiceDetails();
    this.loadCategories();
    this.loadEmployees();
  }

  /** 🔹 Cargar detalles del servicio */
  loadServiceDetails(): void {
    this.serviceService.getServiceById(this.serviceId).subscribe(
      (service) => {
        this.service = { ...service, availability: service.availability || [] }; // ✅ Asegurar que availability no sea undefined
        this.loadServiceAvailability();
      },
      () => this.errors.push('Error al cargar los detalles del servicio.')
    );
  }

  /** 🔹 Cargar categorías */
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => (this.categories = categories),
      () => this.errors.push('Error al cargar las categorías.')
    );
  }

  /** 🔹 Cargar empleados desde `AuthService` */
  loadEmployees(): void {
    this.authService.getEmployeesByCompany(this.companyId).subscribe(
      (employees) => (this.employees = employees),
      () => this.errors.push('Error al cargar los empleados.')
    );
  }

  /** 🔹 Cargar disponibilidad del servicio */
  loadServiceAvailability(): void {
    this.serviceService.getAvailabilitiesByService(this.serviceId).subscribe(
      (availability) => (this.service.availability = availability || []), // ✅ Evitar undefined
      () => this.errors.push('Error al cargar la disponibilidad del servicio.')
    );
  }

  /** 🔹 Seleccionar/Deseleccionar empleados */
  toggleEmployeeSelection(employeeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.service.assignedEmployees.push(employeeId);
    } else {
      this.service.assignedEmployees = this.service.assignedEmployees.filter((id) => id !== employeeId);
    }
  }

  /** 🔹 Seleccionar/Deseleccionar días de disponibilidad */
  toggleDaySelection(day: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.service.availability.push(new ServiceAvailability(this.serviceId, day, '', ''));
    } else {
      this.service.availability = this.service.availability.filter((avail) => avail.dayOfWeek !== day);
    }
  }

  /** 🔹 Validar formulario antes de actualizar */
  validateForm(): boolean {
    this.errors = [];

    if (!this.service.name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!this.service.description.trim()) this.errors.push('La descripción es obligatoria.');
    if (this.service.price <= 0) this.errors.push('El precio debe ser mayor que 0.');
    if (this.service.durationMinutes <= 0) this.errors.push('La duración debe ser mayor que 0.');
    if (!this.service.category) this.errors.push('Debe seleccionar una categoría.');
    if (!this.service.assignedEmployees.length) this.errors.push('Debe asignar al menos un empleado.');
    if (!this.service.availability.length) this.errors.push('Debe seleccionar al menos un día disponible.');

    this.service.availability.forEach((avail) => {
      if (!avail.startTime || !avail.endTime || avail.startTime >= avail.endTime) {
        this.errors.push(`El horario del día ${avail.dayOfWeek} es inválido.`);
      }
    });

    return this.errors.length === 0;
  }

  /** 🔹 Actualizar servicio y disponibilidad */
  updateService(): void {
    if (!this.validateForm()) {
      return;
    }

    this.serviceService.updateService(this.serviceId, this.service).subscribe(
      (updatedService) => {
        this.serviceUpdated.emit(updatedService);

        // Actualizar disponibilidad
        this.serviceService.getAvailabilitiesByService(this.serviceId).subscribe((existingAvailabilities) => {
          existingAvailabilities.forEach((avail) => {
            if (!this.service.availability.some((newAvail) => newAvail.dayOfWeek === avail.dayOfWeek)) {
              this.serviceService.deleteAvailability(avail.id).subscribe();
            }
          });

          this.service.availability.forEach((newAvail) => {
            const existingAvail = existingAvailabilities.find((avail) => avail.dayOfWeek === newAvail.dayOfWeek);
            if (existingAvail) {
              this.serviceService.updateAvailability(existingAvail.id, newAvail).subscribe();
            } else {
              this.serviceService.createAvailability(newAvail).subscribe();
            }
          });

          alert('Servicio actualizado con éxito.');
          this.closeModal();
        });
      },
      () => this.errors.push('Error al actualizar el servicio.')
    );
  }

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }
}
