import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-company-employees-details',
  templateUrl: './company-employees-details.component.html',
  styleUrls: ['./company-employees-details.component.scss']
})
export class CompanyEmployeesDetailsComponent implements OnInit {
  employee: any = null;
  employeeId!: number;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.loadEmployeeDetails();
      }
    });
  }

  /** 🔹 Cargar los detalles del empleado */
  loadEmployeeDetails(): void {
    this.authService.getEmployeeById(this.employeeId).subscribe(
      (employee) => {
        this.employee = employee;
        this.loading = false;
      },
      (error) => {
        console.error('Error obteniendo detalles del empleado:', error);
        this.errorMessage = 'Error al cargar los detalles del empleado.';
        this.loading = false;
      }
    );
  }

  /** 🔹 Volver a la lista de empleados */
  goBack(): void {
    this.router.navigate(['/company/employees']);
  }
}
