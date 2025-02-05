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
  selectedService: any = null; // Servicio seleccionado para mostrar en el modal
  isModalOpen: boolean = false; // Indicador de si el modal está abierto

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices(); // Carga los servicios al inicializar el componente
  }

  private loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data.map((service) => ({
          ...service,
          schedule: service.schedule || 'Horario no disponible',
          location: service.location || 'Ubicación no especificada',
        }));
        this.isLoading = false; // Desactiva el indicador de carga
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los servicios. Intenta nuevamente.';
        this.isLoading = false; // Desactiva el indicador de carga incluso si hay un error
        console.error('Error al cargar los servicios:', err);
      },
    });
  }

  // Abrir el modal con los detalles del servicio
  openServiceModal(service: any): void {
    this.selectedService = { ...service }; // Copia del servicio seleccionado
    this.isModalOpen = true; // Abre el modal
  }

  // Cerrar el modal
  closeModal(event: Event): void {
    event.stopPropagation();
    this.isModalOpen = false; // Cierra el modal
  }

  // Prevenir la propagación del clic al modal para evitar el cierre al hacer clic dentro del contenido
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // Lógica para editar el servicio (puedes agregar más detalles aquí)
  editService(): void {
    console.log('Editar servicio:', this.selectedService);
    // Aquí puedes agregar la lógica para editar el servicio (abrir un formulario, etc.)
  }

  setSelectedService(service: any): void {
    this.selectedService = service;
    this.deleteService();
  }

  // Lógica para eliminar el servicio
  deleteService(): void {
    if (!this.selectedService || !this.selectedService.id) {
      console.warn('No se ha seleccionado un servicio válido.');
      return;
    }
  
    if (!confirm(`¿Seguro que quieres cancelar "${this.selectedService.name}"?`)) {
      return;
    }
  
    this.serviceService.deleteService(this.selectedService.id).subscribe({
      next: (success) => {
        if (success) {
          this.services = this.services.filter(service => service.id !== this.selectedService.id);
          this.selectedService = null; // Resetear selección
          alert('Servicio cancelado correctamente');
        } else {
          alert('No se pudo cancelar el servicio. Inténtalo de nuevo.');
        }
      },
      error: (err) => {
        console.error('Error al cancelar el servicio:', err);
        alert('Error al cancelar el servicio. Por favor, inténtalo más tarde.');
      }
    });
  }  
  
}

