import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-employees',
  templateUrl: './company-employees.component.html',
  styleUrls: ['./company-employees.component.scss'],
})
export class CompanyEmployeesComponent implements OnInit {
  employees: any[] = [];
  companyId!: number;
  showAddEmployeeModal = false;
  errors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'company') {
      this.companyId = currentUser.company.id;
      this.loadEmployees();
    }
  }

  /** 🔹 Cargar empleados de la empresa */
  loadEmployees(): void {
    this.authService.getEmployeesByCompany(this.companyId).subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error obteniendo empleados:', error);
        this.errors.push('Error al obtener los empleados.');
      }
    );
  }

  /** 🔹 Abrir modal para añadir empleados */
  openAddEmployeeModal(): void {
    this.showAddEmployeeModal = true;
  }

  /** 🔹 Cerrar modal para añadir empleados */
  closeAddEmployeeModal(): void {
    this.showAddEmployeeModal = false;
  }

  /** 🔹 Cuando se añade un nuevo empleado */
  onEmployeeAdded(newEmployee: any): void {
    this.employees.push(newEmployee);
    this.closeAddEmployeeModal();
  }

  /** 🔹 Ver detalles del empleado */
  viewEmployeeDetails(employeeId: number): void {
    this.router.navigate(['/company/employee/', employeeId]);
  }

 /** 🔹 Confirmar eliminación de un empleado */
confirmDelete(employeeId: number, employeeName: string, event: Event): void {
  event.stopPropagation(); //  Evita la propagación del evento a la fila <tr>

  const confirmDelete = confirm(`¿Estás seguro de dar de baja a ${employeeName}?`);
  if (confirmDelete) {
    this.deleteEmployee(employeeId);
  }
}


  /** 🔹 Dar de baja a un empleado (actualiza estado y quita empresa) */
  deleteEmployee(employeeId: number): void {
    this.authService.updateUserById(employeeId, { status: 'deleted', company: null }).subscribe(
      () => {
        this.employees = this.employees.filter((e) => e.id !== employeeId);
        alert('Empleado dado de baja correctamente.');
      },
      (error) => {
        console.error('Error al dar de baja al empleado:', error);
        this.errors.push('Error al dar de baja al empleado.');
      }
    );
  }

  /** 🔹 Obtener clase CSS según estado */
  getStatusClass(status: string): string {
    return {
      active: 'status-active',
      inactive: 'status-inactive',
      banned: 'status-banned',
      deleted: 'status-deleted',
    }[status] || 'status-unknown';
  }

  /** 🔹 Texto legible para el estado */
  getStatusText(status: string): string {
    return {
      active: 'Activo',
      inactive: 'Inactivo',
      banned: 'Suspendido',
      deleted: 'Eliminado',
    }[status] || 'Desconocido';
  }
}
