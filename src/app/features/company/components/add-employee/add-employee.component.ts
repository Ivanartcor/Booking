import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

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
    phone: '',
    profile_picture: '',
    role: 'employee', // Fijo para empleados
    companyId: 0,
  };

  errors: string[] = [];

  constructor(private authService: AuthService) {}

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    this.newEmployee.companyId = this.companyId; // Asigna el ID de la empresa
  }

  /**
   * Validación del formulario
   */
  validateForm(): boolean {
    this.errors = [];
    const { name, email, phone } = this.newEmployee;

    if (!name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      this.errors.push('El email es obligatorio y debe ser válido.');
    if (phone && !/^\d{9,15}$/.test(phone))
      this.errors.push('El teléfono debe ser válido (9-15 dígitos).');

    return this.errors.length === 0;
  }

  /**
   * Agrega un nuevo empleado si la validación es exitosa
   */
  addEmployee(): void {
    if (!this.validateForm()) return; // Detener si hay errores

    this.authService.register(this.newEmployee).subscribe(
      (success) => {
        if (success) {
          alert('Empleado agregado con éxito.');
          this.employeeAdded.emit(this.newEmployee); // Emite el evento de empleado añadido
          this.closeModal(); // Cierra el modal
        } else {
          this.errors.push('Error al guardar el empleado.');
        }
      },
      () => this.errors.push('Error en la solicitud al servidor.')
    );
  }

  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.close.emit();
  }
}
