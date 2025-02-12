import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';

declare var bootstrap: any;  // Importar Bootstrap JS para manejar modales

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  employee: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const employeeId = 2;  // ID del empleado a mostrar (puedes hacerlo dinámico)
    
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employee = employees.find(emp => emp.id === employeeId);
    });
  }

  openEditModal(): void {
    // Abre el modal de edición usando Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
    modal.show();
  }

  submitEditForm(): void {
    // Aquí podrías agregar la lógica para guardar los cambios
    console.log('Empleado editado:', this.employee);

    // Cerrar el modal después de guardar
    const modal = bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
    modal.hide();
  }
}

