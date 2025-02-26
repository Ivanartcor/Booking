import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {
  @Input() serviceId: number | null = null;
  @Input() companyId!: number;
  @Output() close = new EventEmitter<void>();

  service: any;
  availability: any[] = [];
  employees: any[] = [];  // 🔹 Lista de empleados asignados al servicio
  showEditModal = false;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    if (this.serviceId) {
      this.loadServiceDetails();
    }
  }

  /** 🔹 Cargar detalles del servicio */
  loadServiceDetails(): void {
    if (this.serviceId) {
      this.serviceService.getServiceById(this.serviceId).subscribe((service) => {
        this.service = service;
        this.loadAvailability();
        this.loadEmployees(); // ✅ Cargar empleados asignados al servicio
      });
    }
  }

  /** 🔹 Cargar disponibilidad del servicio */
  loadAvailability(): void {
    if (this.serviceId) {
      this.serviceService.getAvailabilitiesByService(this.serviceId).subscribe((availability) => {
        this.availability = availability;
      });
    }
  }

  /** 🔹 Cargar empleados asignados al servicio */
  loadEmployees(): void {
    if (this.serviceId) {
      this.serviceService.getEmployeesByService(this.serviceId).subscribe((employees) => {
        this.employees = employees;
      });
    }
  }

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }

  /** 🔹 Abrir modal de edición */
  editService(): void {
    if (this.serviceId !== null) {
      this.showEditModal = true;
    }
  }

  /** 🔹 Cerrar modal de edición */
  closeEditModal(): void {
    this.showEditModal = false;
    this.loadServiceDetails();
  }

  /** 🔹 Actualizar servicio tras edición */
  onServiceUpdated(updatedService: any): void {
    this.service = updatedService;
    this.closeEditModal();
  }

  /** 🔹 Eliminar servicio */
  deleteService(): void {
    if (this.serviceId) {
      this.serviceService.deleteService(this.serviceId).subscribe(() => {
        alert('Servicio eliminado con éxito.');
        this.closeModal();
      });
    }
  }
}
