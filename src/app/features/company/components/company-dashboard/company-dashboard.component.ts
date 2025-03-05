import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  services: any[] = [];
  company: any = null;
  companyId: number = 0;
  statistics: any = null;


  showServiceDetailsModal = false;
  showAddServiceModal = false;
  selectedServiceId: number | null = null;

  errors: string[] = [];


  // Datos para gráficos
  appointmentsData: ChartData<'bar'> | null = null;
  ratingData: ChartData<'doughnut'> | null = null;
  activeClientsData: ChartData<'pie'> | null = null;
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
  };

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'company') {
      this.companyId = currentUser.company.id;
      this.loadCompanyInfo();
      this.loadServices();
    } else {
      this.errors.push('No se pudo obtener la empresa. Inicie sesión nuevamente.');
    }
  }

  /** 🔹 Cargar información de la empresa */
  loadCompanyInfo(): void {
    if (this.companyId) {
      this.companyService.getCompanyById(this.companyId).subscribe(
        (company) => {
          this.company = company;
        },
        () => this.errors.push('Error al obtener la información de la empresa.')
      );
    }
  }

  /** 🔹 Cargar servicios de la empresa */
  loadServices(): void {
    if (this.companyId) {
      this.serviceService.getServicesByCompany(this.companyId).subscribe(
        (services) => this.services = services,
        () => this.errors.push('Error al obtener los servicios.')
      );
    }
  }

  /** 🔹 Abrir modal de detalles de servicio */
  openServiceDetails(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.showServiceDetailsModal = true;
  }

  /** 🔹 Cerrar modal de detalles de servicio */
  closeServiceDetailsModal(): void {
    this.showServiceDetailsModal = false;
    this.selectedServiceId = null;
  }

  /** 🔹 Abrir modal para agregar servicio */
  openAddServiceModal(): void {
    this.showAddServiceModal = true;
  }

  /** 🔹 Cerrar modal de agregar servicio */
  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
  }

  /** 🔹 Cuando se añade un servicio, recargar la lista */
  onServiceAdded(newService: any): void {
    this.services.push(newService);
    this.closeAddServiceModal();
  }
}
