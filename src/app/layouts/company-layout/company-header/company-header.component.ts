import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service'; // Asegúrate de tener este servicio para manejar la autenticación

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.scss']
})
export class CompanyHeaderComponent {
  isDropdownOpen = false;  // Controla si el dropdown está abierto o cerrado
  showAppointmentsModal = false;  // Controla si el modal de citas se debe mostrar

  constructor(private authService: AuthService) {}

  // Método para alternar el estado del dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Método para abrir el modal de citas
  openAppointmentsModal() {
    this.showAppointmentsModal = true;
  }

  // Método para cerrar el modal de citas
  closeAppointmentsModal() {
    this.showAppointmentsModal = false;
  }

  // Detectar clics fuera del dropdown para cerrarlo
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const dropdown = document.querySelector('.nav-item.dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false; // Cierra el dropdown si se hace clic fuera de él
    }
  }

  // Método para cerrar sesión
  logout() {
    console.log('Cerrando sesión...');
    this.authService.logout(); // Llama al servicio de autenticación para cerrar sesión
  }
}
