import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  @Input() companyId!: number; // ID de la empresa
  @Output() close = new EventEmitter<void>(); // Cierre del modal
  @Output() employeeAdded = new EventEmitter<any>(); // Emisión tras agregar empleado

  newEmployee = {
    name: '',
    email: '',
    position: '',
    hireDate: '',
    specialization: [] as number[],
    companyId: 0,
  };

  errors: string[] = [];
  specializations: any[] = []; // Especializaciones cargadas dinámicamente

  constructor(private employeeService: EmployeeService) {}

  /**
   * Inicializa el componente cargando especializaciones
   */
  ngOnInit(): void {
    this.newEmployee.companyId = this.companyId; // Asigna el ID de la empresa
    this.loadSpecializations(); // Carga especializaciones dinámicamente
  }

  /**
   * Carga especializaciones desde el servicio
   */
  loadSpecializations(): void {
    this.employeeService.getSpecializations().subscribe(
      (specs) => (this.specializations = specs),
      () => this.errors.push('Error al cargar especializaciones.')
    );
  }

  /**
   * Validación del formulario
   */
  validateForm(): boolean {
    this.errors = [];
    const { name, email, position, hireDate, specialization } = this.newEmployee;

    if (!name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      this.errors.push('El email es obligatorio y debe ser válido.');
    if (!position.trim()) this.errors.push('El cargo es obligatorio.');
    if (!hireDate) this.errors.push('La fecha de contratación es obligatoria.');
    if (!specialization.length)
      this.errors.push('Debe seleccionar al menos una especialización.');

    return this.errors.length === 0;
  }

  /**
   * Agrega un nuevo empleado si la validación es exitosa
   */
  addEmployee(): void {
    if (!this.validateForm()) return; // Detener si hay errores

    this.employeeService.createEmployee(this.newEmployee).subscribe(
      (employee) => {
        alert('Empleado agregado con éxito.');
        this.employeeAdded.emit(employee); // Emite el evento de empleado añadido
        this.closeModal(); // Cierra el modal
      },
      () => this.errors.push('Error al guardar el empleado.')
    );
  }

  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.close.emit();
  }

  /**
   * Controla la selección de especialización
   */
  toggleSpecialization(specializationId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.newEmployee.specialization.includes(specializationId)) {
        this.newEmployee.specialization.push(specializationId);
      }
    } else {
      this.newEmployee.specialization = this.newEmployee.specialization.filter(
        (id) => id !== specializationId
      );
    }
  }
}
