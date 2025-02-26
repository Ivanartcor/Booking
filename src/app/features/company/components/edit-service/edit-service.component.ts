import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';

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
    type: 'in_person',
    price: 0,
    duration_minutes: 0,
    status: 'active',
    category: '',
    assignedEmployees: [] as number[],
    availability: [] as any[],
  };

  employees: any[] = [];
  assignedEmployees: number[] = [];
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
        this.service = { 
          ...service, 
          availability: service.availability || [],
          assignedEmployees: []
        };
        this.loadServiceAvailability();
        this.loadAssignedEmployees();
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

  /** 🔹 Cargar empleados SOLO de la empresa actual */
  loadEmployees(): void {
    this.authService.getEmployeesByCompany(this.companyId).subscribe(
      (employees) => {
        this.employees = employees;
      },
      () => this.errors.push('Error al cargar los empleados.')
    );
  }

  /** 🔹 Cargar empleados asignados al servicio */
  loadAssignedEmployees(): void {
    this.serviceService.getEmployeesByService(this.serviceId).subscribe(
      (employees) => {
        this.assignedEmployees = employees.map(e => e.employee_id);
      },
      () => this.errors.push('Error al cargar los empleados asignados.')
    );
  }

  /** 🔹 Cargar disponibilidad del servicio */
  loadServiceAvailability(): void {
    this.serviceService.getAvailabilitiesByService(this.serviceId).subscribe(
      (availability) => {
        this.service.availability = availability || [];
      },
      () => this.errors.push('Error al cargar la disponibilidad del servicio.')
    );
  }

  /** 🔹 Seleccionar/Deseleccionar empleados */
  toggleEmployeeSelection(employeeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.assignedEmployees.push(employeeId);
      this.serviceService.assignEmployeeToService(this.serviceId, employeeId).subscribe();
    } else {
      this.assignedEmployees = this.assignedEmployees.filter((id) => id !== employeeId);
      this.serviceService.removeEmployeeFromService(this.serviceId, employeeId).subscribe();
    }
  }

  /** 🔹 Seleccionar/Deseleccionar días de disponibilidad */
  toggleDaySelection(day: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.service.availability.some(a => a.day_of_week === day)) {
        const newAvailability = { service_id: this.serviceId, day_of_week: day, start_time: '08:00', end_time: '17:00' };
        this.serviceService.createAvailability(newAvailability).subscribe((createdAvailability) => {
          this.service.availability.push(createdAvailability);
        });
      }
    } else {
      const availability = this.service.availability.find(a => a.day_of_week === day);
      if (availability) {
        this.serviceService.deleteAvailability(availability.id).subscribe(() => {
          this.service.availability = this.service.availability.filter(a => a.day_of_week !== day);
        });
      }
    }
  }

  /** 🔹 Validar formulario antes de actualizar */
  validateForm(): boolean {
    this.errors = [];

    if (!this.service.name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!this.service.description.trim()) this.errors.push('La descripción es obligatoria.');
    if (this.service.price <= 0) this.errors.push('El precio debe ser mayor que 0.');
    if (this.service.duration_minutes <= 0) this.errors.push('La duración debe ser mayor que 0.');
    if (!this.service.category) this.errors.push('Debe seleccionar una categoría.');
    if (!this.assignedEmployees.length) this.errors.push('Debe asignar al menos un empleado.');

    return this.errors.length === 0;
  }

  /** 🔹 Actualizar servicio */
  updateService(): void {
    if (!this.validateForm()) return;

    this.serviceService.updateService(this.serviceId, this.service).subscribe(
      (updatedService) => {
        this.serviceUpdated.emit(updatedService);
        alert('Servicio actualizado con éxito.');
        this.closeModal();
      },
      () => this.errors.push('Error al actualizar el servicio.')
    );
  }

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }
}
