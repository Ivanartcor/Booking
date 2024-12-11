import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  services: any[] = [];
  companyId: number | null = null;

  showServiceDetailsModal = false;
  selectedServiceId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}
  
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

  loadServices() {
    this.http.get<any[]>('assets/data/services.json').subscribe((services) => {
      this.services = services.filter((s) => s.companyId === this.companyId);
    });
  }

  openServiceDetails(serviceId: number) {
    this.selectedServiceId = serviceId;
    this.showServiceDetailsModal = true;
  }

  closeServiceDetailsModal() {
    this.showServiceDetailsModal = false;
    this.selectedServiceId = null;
  }
}
