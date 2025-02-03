import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';

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
}

