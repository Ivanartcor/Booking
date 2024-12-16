import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { CategoryService } from 'src/app/core/services/category.service';

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
    this.service.companyId = this.companyId;
    this.loadCategories();
    this.loadEmployees();
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
        (id) => id !== employeeId
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
        (d) => d !== day
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

  addService(): void {
    if (!this.validateForm()) {
      return;
    }

    this.serviceService.createService(this.service).subscribe(
      (newService) => {
        this.serviceAdded.emit(newService);
        alert('Servicio agregado con éxito.');
        this.closeModal();
      },
      () => this.errors.push('Error al guardar el servicio.')
    );
  }

  closeModal(): void {
    this.close.emit();
  }
}
