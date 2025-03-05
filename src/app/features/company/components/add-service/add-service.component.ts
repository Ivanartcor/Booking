import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ServiceService } from 'src/app/core/services/service.service';

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
    company: null,
    description: '',
    type: 'in_person',
    price: 0,
    duration_minutes: 0,
    status: 'active',
  };

  employees: any[] = [];
  assignedEmployees: number[] = [];
  availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  availabilities: any[] = [];
  errors: string[] = [];
  currentCompany: any = null; // Guardaremos la empresa aquí


  constructor(
    private serviceService: ServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCurrentCompany();
    this.loadEmployees();
  }

  /** 🔹 Obtener la empresa del usuario actual */
  loadCurrentCompany(): void {
    const userData = localStorage.getItem('user'); // Obtener el usuario actual
    if (userData) {
      const user = JSON.parse(userData);
      if (user.company) {
        this.currentCompany = user.company;
        this.service.company = this.currentCompany; // Asignar la empresa al servicio
      }
    }
    console.log("📌 Empresa asignada al servicio:", this.service.company);
  }


  /** 🔹 Cargar empleados de la empresa actual */
  loadEmployees(): void {
    this.authService.getEmployeesByCompany(this.companyId).subscribe(
      (employees) => {
        this.employees = employees;
      },
      () => this.errors.push('Error al cargar los empleados de la empresa.')
    );
  }

  /** 🔹 Seleccionar/Deseleccionar empleados */
  toggleEmployeeSelection(employeeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.assignedEmployees.push(employeeId);
    } else {
      this.assignedEmployees = this.assignedEmployees.filter((id) => id !== employeeId);
    }
  }

  /** 🔹 Seleccionar/Deseleccionar días de disponibilidad */
  toggleDaySelection(day: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.isDayAvailable(day)) {
        this.availabilities.push(
          {
            service: null,
            day_of_week: day,
            start_time: '08:00',
            end_time: '17:00'
          });
      }
    } else {
      this.availabilities = this.availabilities.filter((a) => a.day_of_week !== day);
    }
  }

  /** 🔹 Verificar si un día ya está marcado en la disponibilidad */
  isDayAvailable(day: string): boolean {
    return this.availabilities.some((a) => a.day_of_week === day);
  }

  /** 🔹 Validar formulario antes de guardar */
  validateForm(): boolean {
    this.errors = [];

    if (!this.service.name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!this.service.description.trim()) this.errors.push('La descripción es obligatoria.');
    if (this.service.price <= 0) this.errors.push('El precio debe ser mayor que 0.');
    if (this.service.duration_minutes <= 0) this.errors.push('La duración debe ser mayor que 0.');
    if (!this.assignedEmployees.length) this.errors.push('Debe asignar al menos un empleado.');

    return this.errors.length === 0;
  }

  /** 🔹 Guardar servicio */
  addService(): void {
    if (!this.validateForm()) return;
  
    console.log("🚀 Enviando servicio:", this.service);
  
    this.serviceService.createService(this.service).subscribe(
      (newService) => {
        if (!newService || !newService.id) {  // 🔥 Asegurar que se creó correctamente
          this.errors.push("Error: No se pudo crear el servicio.");
          return;
        }
  
        this.assignEmployeesToService(newService.id);
        this.addAvailabilities(newService);
        this.serviceAdded.emit(newService);
        alert('✅ Servicio agregado con éxito.');
        this.closeModal();
      },
      (error) => {
        console.error("Error al guardar el servicio:", error);
        this.errors.push('Error al guardar el servicio.');
      }
    );
  }

  /** 🔹 Asignar empleados al servicio recién creado */
  assignEmployeesToService(serviceId: number): void {
    this.assignedEmployees.forEach((employeeId) => {
      this.serviceService.assignEmployeeToService(serviceId, employeeId).subscribe();
    });
  }

  /** 🔹 Agregar disponibilidad al servicio */
  addAvailabilities(service: any): void {
    this.availabilities.forEach((availability) => {
      availability.service = service;
      this.serviceService.createAvailability(availability).subscribe();
    });
  }

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }
}
