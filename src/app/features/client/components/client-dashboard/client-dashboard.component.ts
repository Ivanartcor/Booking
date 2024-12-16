import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {
  isMenuOpen = false;
  isDropdownOpen = false;
  selectedCategory: string = '';
  selectedCity: string = ''; // Agregar la ciudad seleccionada

  // Lista de ciudades disponibles
  cities = ['Madrid', 'Barcelona', 'Valencia'];

  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Detiene la propagación del clic
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation(); // Detiene la propagación del clic
  }

  @HostListener('document:click', ['$event'])
  closeOnClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.menu-dropdown');
    const menuButton = document.querySelector('.menu-btn');

    if (dropdown && !dropdown.contains(target) && !menuButton?.contains(target)) {
      this.isDropdownOpen = false;
    }

    const menu = document.querySelector('.menu');
    if (menu && !menu.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  get filteredCompanies() {
    return this.companies.filter(company => {
      const matchesCategory = this.selectedCategory ? company.categoria === this.selectedCategory : true;
      const matchesCity = this.selectedCity ? company.ciudad === this.selectedCity : true;
      return matchesCategory && matchesCity;
    });
  }

  selectCategory(event: Event, category: string): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto de los enlaces
    this.selectedCategory = category;
    this.isDropdownOpen = false; // Cierra el dropdown después de seleccionar la categoría
  }

  selectCity(event: Event): void {
    const target = event.target as HTMLSelectElement;  // Aseguramos que target es un HTMLSelectElement
    if (target) {
      this.selectedCity = target.value;  // Accedemos al valor del select
    }
    this.isDropdownOpen = false;  // Cierra el dropdown después de seleccionar
  }
  
  

  goToCompanyDetails(id: number): void {
    this.router.navigate([`/client/company`, id]);
  }
}
