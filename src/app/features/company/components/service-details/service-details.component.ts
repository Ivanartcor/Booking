import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {
  @Input() serviceId: number | null = null;
  @Input() companyId!: number; // ID de la empresa
  @Output() close = new EventEmitter<void>();

  service: any;
  assignedEmployees: any[] = [];
  showEditModal = false;

  constructor(
    private serviceService: ServiceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (this.serviceId) {
      this.loadServiceDetails();
    }
  }

  loadServiceDetails(): void {
    if (this.serviceId) {
      this.serviceService.getServiceById(this.serviceId).subscribe((service) => {
        this.service = service;
        this.loadAssignedEmployees();
      });
    }
  }

  loadAssignedEmployees(): void {
    if (this.service && this.service.assignedEmployees) {
      this.employeeService
        .getEmployeesByIds(this.service.assignedEmployees)
        .subscribe((employees) => {
          this.assignedEmployees = employees;
        });
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  editService(): void {
    if (this.serviceId !== null) {
      this.showEditModal = true;
    } else {
      console.error('El ID del servicio no es válido.');
    }
  }

  closeEditModal(): void {
    this.showEditModal = false; // Cierra el modal de edición
    this.loadServiceDetails(); // Recarga los detalles actualizados
  }

  onServiceUpdated(updatedService: any): void {
    this.service = updatedService; // Actualiza los datos del servicio
    this.closeEditModal(); // Cierra el modal de edición
  }

  deleteService(): void {
    if (this.serviceId) {
      this.serviceService.deleteService(this.serviceId).subscribe((success) => {
        if (success) {
          alert('Servicio eliminado con éxito.');
          this.closeModal();
        } else {
          alert('Error al eliminar el servicio.');
        }
      });
    }
  }
}
