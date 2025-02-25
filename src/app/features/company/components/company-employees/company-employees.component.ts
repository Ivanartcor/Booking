import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'company') {
      this.companyId = currentUser.id;
      this.loadEmployees();
    }
  }

  loadEmployees(): void {
    this.authService.getEmployeesByCompany(this.companyId).subscribe((employees) => {
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
    this.employees.push(newEmployee); 
    this.closeAddEmployeeModal(); 
  }
}


