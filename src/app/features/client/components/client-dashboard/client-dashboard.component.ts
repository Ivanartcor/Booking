import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {
  isMenuOpen = false;
  isDropdownOpen: boolean = false;
  
  companies = [
    {
      id: 1,
      name: 'Peluquería Lola',
      description: 'Servicios de cuidado capilar orgánico.',
      image: 'https://images.pexels.com/photos/7755449/pexels-photo-7755449.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Vitaldent',
      description: 'Cuida tu sonrisa con tecnología avanzada.',
      image: 'https://images.pexels.com/photos/4269942/pexels-photo-4269942.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];
  

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(event: Event) {
    const target = event.target as HTMLElement;
    const menuDropdown = document.querySelector('.menu-dropdown');
    if (menuDropdown && !menuDropdown.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  constructor(private router: Router) {}

  goToCompanyDetails(id: number) {
    this.router.navigate([`/client/company`, id]); // Navega a la página de detalles de la empresa
  }
}
