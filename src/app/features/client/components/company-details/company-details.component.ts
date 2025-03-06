import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CompanyCategoryService } from 'src/app/core/services/company-category.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: any = null;
  services: any[] = [];
  categories: any[] = [];  // 🔹 Categorías de la empresa
  loading = true;
  errorMessage = '';
  showAppointmentModal = false; // Controla la visibilidad del modal
  selectedServiceId: number | null = null;
  userId: number | null = null; // ID del usuario autenticado


  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private serviceService: ServiceService,
    private companyCategoryService: CompanyCategoryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const companyId = Number(this.route.snapshot.paramMap.get('id'));
    if (companyId) {
      this.loadCompanyDetails(companyId);
    } else {
      this.errorMessage = 'No se encontró la empresa.';
      this.loading = false;
    }

    // Obtener ID del usuario autenticado
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
    }
  }

  /** ✅ Cargar información de la empresa */
  loadCompanyDetails(companyId: number): void {
    this.companyService.getCompanyById(companyId).subscribe(
      (company) => {
        if (!company) {
          this.errorMessage = 'Empresa no encontrada.';
          this.loading = false;
          return;
        }
        this.company = company;
        this.loadServices(company.id);
        this.loadCompanyCategories(company.id);
      },
      (error) => {
        console.error('Error obteniendo empresa:', error);
        this.errorMessage = 'Error al cargar la empresa.';
        this.loading = false;
      }
    );
  }

  /** ✅ Obtener los servicios de la empresa */
  loadServices(companyId: number): void {
    this.serviceService.getServicesByCompany(companyId).subscribe(
      (services) => {
        this.services = services;
        this.loading = false;
      },
      (error) => {
        console.error('Error obteniendo servicios:', error);
        this.errorMessage = 'Error al cargar los servicios.';
        this.loading = false;
      }
    );
  }

  /** ✅ Obtener la categoría de la empresa */
  loadCompanyCategories(companyId: number): void {
    this.companyCategoryService.getCategoriesByCompany(companyId).subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  /** ✅ Abrir modal de reserva */
  openAppointmentModal(serviceId: number): void {
    if (!this.userId) {
      alert('Debes iniciar sesión para reservar un servicio.');
      return;
    }
    this.selectedServiceId = serviceId;
    this.showAppointmentModal = true;
  }

  /** ✅ Cerrar modal de reserva */
  closeAppointmentModal(): void {
    this.showAppointmentModal = false;
    this.selectedServiceId = null;
  }
}
