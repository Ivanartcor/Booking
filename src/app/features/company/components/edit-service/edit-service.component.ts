import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ServiceService } from 'src/app/core/services/service.service';
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
    price: 0,
    durationMinutes: 0,
    category: '',
    assignedEmployees: [] as number[],
    availability: {
      days: [] as string[],
      hours: { start: '', end: '' },
    },
    companyId: 0,
  };

  employees: any[] = [];
  categories: any[] = [];
  availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  errors: string[] = [];

  constructor(
    private serviceService: ServiceService,
    private employeeService: EmployeeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadServiceDetails();
    this.loadCategories();
    this.loadEmployees();
  }

  loadServiceDetails(): void {
    this.serviceService.getServiceById(this.serviceId).subscribe(
      (service) => {
        this.service = { ...service }; // Carga los detalles del servicio
      },
      () => this.errors.push('Error al cargar los detalles del servicio.')
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => (this.categories = categories),
      () => this.errors.push('Error al cargar las categorías.')
    );
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesByCompany(this.companyId).subscribe(
      (employees) => (this.employees = employees),
      () => this.errors.push('Error al cargar los empleados.')
    );
  }

  toggleEmployeeSelection(employeeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.service.assignedEmployees.includes(employeeId)) {
        this.service.assignedEmployees.push(employeeId);
      }
    } else {
      this.service.assignedEmployees = this.service.assignedEmployees.filter(
        (id: number) => id !== employeeId
      );
    }
  }

  toggleDaySelection(day: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.service.availability.days.includes(day)) {
        this.service.availability.days.push(day);
      }
    } else {
      this.service.availability.days = this.service.availability.days.filter(
        (d: string) => d !== day
      );
    }
  }

  validateForm(): boolean {
    this.errors = [];

    if (!this.service.name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!this.service.description.trim()) this.errors.push('La descripción es obligatoria.');
    if (this.service.price <= 0) this.errors.push('El precio debe ser mayor que 0.');
    if (this.service.durationMinutes <= 0) this.errors.push('La duración debe ser mayor que 0.');
    if (!this.service.category) this.errors.push('Debe seleccionar una categoría.');
    if (!this.service.assignedEmployees.length) this.errors.push('Debe asignar al menos un empleado.');
    if (!this.service.availability.days.length) this.errors.push('Debe seleccionar al menos un día disponible.');

    const { start, end } = this.service.availability.hours;
    if (!start || !end || start >= end) {
      this.errors.push('Debe establecer un horario válido y correcto.');
    }

    return this.errors.length === 0;
  }

  updateService(): void {
    if (!this.validateForm()) {
      return;
    }

    this.serviceService.updateService(this.service).subscribe(
      (updatedService) => {
        this.serviceUpdated.emit(updatedService);
        alert('Servicio actualizado con éxito.');
        this.closeModal();
      },
      () => this.errors.push('Error al actualizar el servicio.')
    );
  }

  closeModal(): void {
    this.close.emit();
  }
}
