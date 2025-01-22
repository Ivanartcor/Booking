import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  services: any[] = []; // Lista de servicios cargados
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string | null = null; // Mensaje de error

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices(); // Carga los servicios al inicializar el componente
  }

  private loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data; // Asigna los servicios obtenidos
        this.isLoading = false; // Desactiva el indicador de carga
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los servicios. Intenta nuevamente.';
        this.isLoading = false; // Desactiva el indicador de carga incluso si hay un error
        console.error('Error al cargar los servicios:', err);
      },
    });
  }
}
