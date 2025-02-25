import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: any;
  services: any[] = [];
  userId: number | null = null; // ID del usuario autenticado

  constructor(
    private route: ActivatedRoute, 
    private companyService: CompanyService, 
    private serviceService: ServiceService,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const companyId = Number(this.route.snapshot.paramMap.get('id'));
    if (companyId) {
      this.loadCompanyDetails(companyId);
    }

    // Obtener ID del usuario autenticado
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
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
      this.checkReservations();
    });
  }

  /** 🔹 Verifica si los servicios ya han sido reservados por el usuario */
  checkReservations(): void {
    if (!this.userId) return;

    this.appointmentService.getAppointmentsByClient(this.userId).subscribe((appointments) => {
      this.services.forEach(service => {
        service.reserved = appointments.some(app => app.serviceId === service.id);
      });
    });
  }

  /** 🔹 Reservar servicio */
  reserveService(serviceId: number): void {
    if (!this.userId) {
      console.error('Usuario no autenticado');
      return;
    }

    const appointmentData = {
      clientId: this.userId,
      serviceId: serviceId,
      companyId: this.company.id,
      status: 'pending', // Estado inicial de la reserva
      appointmentDate: new Date(), // Se puede modificar según la lógica de la app
    };

    this.appointmentService.createAppointment(appointmentData).subscribe((response) => {
      if (response) {
        console.log('Servicio reservado con éxito');
        this.services.find(service => service.id === serviceId)!.reserved = true;
      } else {
        console.error('Error al reservar el servicio');
      }
    });
  }
}
