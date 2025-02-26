import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { CategoryService } from 'src/app/core/services/category.service';

/** 🔹 Modelo de disponibilidad dentro del componente */
class ServiceAvailability {
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
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  
  @Input() companyId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() serviceAdded = new EventEmitter<any>();

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
    this.service.companyId = this.companyId;
    this.loadCategories();
    this.loadEmployees();
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
    this.service.availability.push(new ServiceAvailability(null as any, day, '', '')); // ⚠️ `null` por ahora
  } else {
    this.service.availability = this.service.availability.filter((avail) => avail.dayOfWeek !== day);
  }
}

  /** 🔹 Validar formulario antes de guardar */
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

  /** 🔹 Guardar servicio y disponibilidad */
addService(): void {
  if (!this.validateForm()) {
    return;
  }

  this.serviceService.createService(this.service).subscribe(
    (newService) => {
      this.serviceAdded.emit(newService);

      // 🔹 Ahora que tenemos el `serviceId`, actualizamos las disponibilidades
      this.service.availability.forEach((avail) => {
        avail.serviceId = newService.id; // Asignar el ID real
        this.serviceService.createAvailability(avail).subscribe();
      });

      alert('Servicio agregado con éxito.');
      this.closeModal();
    },
    () => this.errors.push('Error al guardar el servicio.')
  );
}

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }
}
