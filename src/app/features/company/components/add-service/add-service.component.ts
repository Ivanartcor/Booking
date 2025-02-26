import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
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

  service: any = {
    name: '',
    description: '',
    price: null,
    durationMinutes: null,
    category: '',
    assignedEmployees: [],
    availability: {
      days: [],
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
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.service.companyId = this.companyId;
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: () => this.errors.push('Error al cargar las categorías.')
    });
  }



  toggleSelection(list: any[], value: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!list.includes(value)) list.push(value);
    } else {
      const index = list.indexOf(value);
      if (index !== -1) list.splice(index, 1);
    }
  }

  validateForm(): boolean {
    this.errors = [];

    if (!this.service.name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!this.service.description.trim()) this.errors.push('La descripción es obligatoria.');
    if (!this.service.price || this.service.price <= 0) this.errors.push('El precio debe ser mayor que 0.');
    if (!this.service.durationMinutes || this.service.durationMinutes <= 0) this.errors.push('La duración debe ser mayor que 0.');
    if (!this.service.category) this.errors.push('Debe seleccionar una categoría.');
    if (!this.service.assignedEmployees.length) this.errors.push('Debe asignar al menos un empleado.');
    if (!this.service.availability.days.length) this.errors.push('Debe seleccionar al menos un día disponible.');
    
    const { start, end } = this.service.availability.hours;
    if (!start || !end || start >= end) {
      this.errors.push('Debe establecer un horario válido.');
    }

    return this.errors.length === 0;
  }

  addService(): void {
    if (!this.validateForm()) return;
    
    this.serviceService.createService(this.service).subscribe({
      next: (newService) => {
        this.serviceAdded.emit(newService);
        alert('Servicio agregado con éxito.');
        this.closeModal();
      },
      error: () => this.errors.push('Error al guardar el servicio.')
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}