import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-company-employees',
  templateUrl: './company-employees.component.html',
  styleUrls: ['./company-employees.component.scss'],
})
export class CompanyEmployeesComponent implements OnInit {
  employees: any[] = [];
  companyId!: number;

  showAddEmployeeModal = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'company') {
      this.companyId = currentUser.id;
      this.loadEmployees();
    }
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesByCompany(this.companyId).subscribe((employees) => {
      this.employees = employees;
    });
  }

  openAddEmployeeModal(): void {
    this.showAddEmployeeModal = true;
  }

  closeAddEmployeeModal(): void {
    this.showAddEmployeeModal = false;
  }

  onEmployeeAdded(newEmployee: any): void {
    this.employees.push(newEmployee); // Actualiza la lista
    this.closeAddEmployeeModal(); // Cierra el modal
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe((success) => {
      if (success) {
        this.employees = this.employees.filter(e => e.id !== employeeId);
        alert('Empleado eliminado con éxito.');
      } else {
        alert('Error al eliminar el empleado.');
      }
    });
  }
}
