import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { CategoryService } from 'src/app/core/services/category.service';

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
    description: '',
    price: 0,
    durationMinutes: 0,
    category: '',
    assignedEmployees: [] as number[],
    availability: {
      days: [] as string[],
      hours: { start: '', end: '' },
    },
    companyId: this.companyId,
  };

  employees: any[] = [];
  categories: any[] = [];
  availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(
    private serviceService: ServiceService,
    private employeeService: EmployeeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadEmployees();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesByCompany(this.companyId).subscribe((employees) => {
      this.employees = employees;
    });
  }

  addService(): void {
    this.service.companyId = this.companyId; 

    this.serviceService.createService(this.service).subscribe((newService) => {
      this.serviceAdded.emit(newService); 
      alert('Servicio agregado con éxito.');
      this.closeModal(); 
    });
  }

  closeModal(): void {
    this.close.emit(); 
  }
}
