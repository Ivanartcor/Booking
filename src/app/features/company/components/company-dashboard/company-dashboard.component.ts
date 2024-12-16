import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  services: any[] = [];
  companyId: number = 0;

  showServiceDetailsModal = false;
  showAddServiceModal = false;
  selectedServiceId: number | null = null;

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService
  ) {}
  
  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    /*
    para cuando se inicie sesion correctamente
    if (currentUser && currentUser.role === 'company') {
      this.companyId = currentUser.id;
      this.loadServices();
    }
    */
    this.companyId = 2;
    this.loadServices();
  }

  loadServices(): void {
    if (this.companyId) {
      this.serviceService
        .getServicesByCompany(this.companyId)
        .subscribe((services) => {
          this.services = services;
        });
    }
  }

  openServiceDetails(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.showServiceDetailsModal = true;
  }

  closeServiceDetailsModal(): void {
    this.showServiceDetailsModal = false;
    this.selectedServiceId = null;
  }

  openAddServiceModal(): void {
    this.showAddServiceModal = true;
  }

  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
  }

  onServiceAdded(newService: any): void {
    this.services.push(newService); // Actualiza la lista de servicios
    this.closeAddServiceModal();   // Cierra el modal
  }
}
