import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: any;
  services: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private companyService: CompanyService, 
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const companyId = Number(this.route.snapshot.paramMap.get('id'));
    if (companyId) {
      this.loadCompanyDetails(companyId);
    }
  }

  /** 🔹 Cargar detalles de la empresa */
  loadCompanyDetails(companyId: number): void {
    this.companyService.getCompanyById(companyId).subscribe((company) => {
      this.company = company;
      this.loadServices(company.id);
    });
  }

  /** 🔹 Obtener servicios de la empresa */
  loadServices(companyId: number): void {
    this.serviceService.getServicesByCompany(companyId).subscribe((services) => {
      this.services = services;
    });
  }

  /** 🔹 Reservar servicio */
  reserveService(serviceId: number): void {
    const service = this.services.find((s) => s.id === serviceId);
    if (service) {
      service.reserved = true;
    }
  }
}
