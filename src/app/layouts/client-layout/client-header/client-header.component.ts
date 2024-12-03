import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent {
  // Propiedad que controla si el dropdown está abierto o cerrado
  isDropdownOpen = false;

  // Método para alternar el estado del dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Cambia entre true y false
  }

  logout() {
    console.log('Cerrando sesión...');
    // Lógica para cerrar sesión aquí
  }
}
