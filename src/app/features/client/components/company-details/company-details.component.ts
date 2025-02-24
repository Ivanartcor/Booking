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
    const companyId = +this.route.snapshot.paramMap.get('id')!;
    //this.loadCompanyDetails(companyId);
  }

  
  loadCompanyDetails(companyId: number): void {
    this.companyService.getCompanyById(companyId).subscribe((company) => {
      this.company = company;
      if (this.company && this.company.services.length > 0) {
        this.loadServices(this.company.services);
      }
    });
  }


  
  loadServices(serviceIds: number[]): void {
    this.serviceService.getServicesByIds(serviceIds).subscribe((services) => {
      this.services = services;
    });
  }
    

  reserveService(serviceId: number): void {
    const service = this.services.find((s) => s.id === serviceId);
    if (service) {
      service.reserved = true;
    }
  }
}
