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

  companies = [
    {
      id: 1,
      name: 'Peluquería Lola',
      description: `En un rincón especializado lleno de amabilidad y estilo, Peluquería Lola...`,
      image: 'https://images.pexels.com/photos/7755449/pexels-photo-7755449.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Estética',
      ciudad: 'Madrid',
      imageCredit: 'Pexels / John Doe',  // Crédito de la imagen
      imageLicense: 'Licencia libre',    // Licencia de la imagen
    },
    {
      id: 2,
      name: 'Vitaldent',
      description: `Tu sonrisa es nuestra prioridad...`,
      image: 'https://images.pexels.com/photos/4269942/pexels-photo-4269942.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Salud',
      ciudad: 'Barcelona',
      imageCredit: 'Pexels / Jane Doe',  // Crédito de la imagen
      imageLicense: 'Licencia libre',    // Licencia de la imagen
    },
    {
      id: 3,
      name: 'Spa Relax',
      description: `El lugar ideal para desconectar...`,
      image: 'https://www.wonderbox.es/wondermedias/sys_master/productmedias/h8d/hc8/952708-560x373.jpg',
      categoria: 'Estética',
      ciudad: 'Valencia',
      imageCredit: 'Wonderbox',           // Crédito de la imagen
      imageLicense: 'Licencia comercial', // Licencia de la imagen
    },
    {
      id: 4,
      name: 'Limpiezas Express',
      description: `Servicios rápidos y eficientes de limpieza...`,
      image: 'https://inafe.es/wp-content/uploads/%C2%BFBuscas-una-aseguranza-para-negocio-de-limpieza-en-2023.webp',
      categoria: 'Limpieza',
      ciudad: 'Madrid',
      imageCredit: 'Inafe',               // Crédito de la imagen
      imageLicense: 'Licencia comercial', // Licencia de la imagen
    }
  ];
  
  constructor(private router: Router) { }

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
