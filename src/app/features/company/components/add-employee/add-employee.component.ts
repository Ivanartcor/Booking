import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  @Input() companyId!: number; // Se pasará el objeto completo de la empresa
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() employeeAdded = new EventEmitter<any>(); // Evento para notificar al padre

  newEmployee = {
    name: '',
    email: '',
    phone: '',
    password: '', // Se ingresará manualmente
    confirmPassword: '', // Nuevo campo para confirmar la contraseña
    role: 'employee', // Rol fijo para empleados
    company: null, // Se asignará en `ngOnInit`
    status: 'active', // Estado por defecto
  };

  errors: string[] = [];
  loading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.company) {
      this.newEmployee.company = user.company; // Extraemos la empresa del usuario autenticado
    } else {
      this.errors.push('Error: No se encontró la empresa del usuario.');
    }
  }

  /**
   * Validación del formulario
   */
  validateForm(): boolean {
    this.errors = [];
    const { name, email, phone, password, confirmPassword } = this.newEmployee;

    if (!name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      this.errors.push('El email es obligatorio y debe ser válido.');
    if (!password.trim() || password.length < 6)
      this.errors.push('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
    if (password !== confirmPassword)
      this.errors.push('Las contraseñas no coinciden.');
    if (phone && !/^\d{9,15}$/.test(phone))
      this.errors.push('El teléfono debe ser válido (9-15 dígitos).');

    return this.errors.length === 0;
  }
  /**
   * Agrega un nuevo empleado con los datos ingresados
   */
  addEmployee(): void {
    if (!this.validateForm()) return;

    this.loading = true;

    const { confirmPassword, ...employeeData } = this.newEmployee;

    this.authService.register(employeeData).subscribe(
      (success) => {
        this.loading = false;
        if (success) {
          alert('Empleado agregado con éxito.');
          this.employeeAdded.emit(employeeData);
          this.closeModal();
        } else {
          this.errors.push('Error al guardar el empleado.');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error en la solicitud:', error);
        this.errors.push('Error en la solicitud al servidor.');
      }
    );
  }


  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.close.emit();
  }
}
