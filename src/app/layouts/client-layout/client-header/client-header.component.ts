import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent {
  // Propiedad que controla si el dropdown está abierto o cerrado
  isDropdownOpen = false;
  
  showAppointmentsModal = false;

  constructor(private authService: AuthService) {}

  // Método para alternar el estado del dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Cambia entre true y false
  }

  openAppointmentsModal() {
    this.showAppointmentsModal = true;
  }

  closeAppointmentsModal() {
    this.showAppointmentsModal = false;
  }

  // Detectar clics fuera del desplegable
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    // Verifica si el clic fue fuera del menú desplegable
    const dropdown = document.querySelector('.nav-item.dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false; // Cierra el menú si clicas fuera
    }
  }

  logout() {
    console.log('Cerrando sesión...');
    this.authService.logout(); // Llama al método del AuthService
  }
}
