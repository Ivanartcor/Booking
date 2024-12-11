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

  companies = [
    {
      id: 1,
      name: 'Peluquería Lola',
      description: `
        En un rincón especializado lleno de amabilidad y estilo, Peluquería Lola destaca por su atención personalizada. 
        Ofrecemos servicios de calidad para el cuidado del cabello, con productos 100% orgánicos y profesionales altamente capacitados. 
        Disfruta de cortes modernos, peinados para ocasiones especiales, tintes personalizados y tratamientos capilares avanzados. 
        Además, garantizamos un ambiente cómodo y relajante. ¡Reserva tu cita ahora y vive una experiencia única en el cuidado de tu cabello!
      `,
      image: 'https://images.pexels.com/photos/7755449/pexels-photo-7755449.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Vitaldent',
      description: `
        Tu sonrisa es nuestra prioridad. Con tecnología avanzada y un equipo experto, Vitaldent ofrece servicios de alta calidad en odontología. 
        Desde limpiezas dentales de rutina hasta tratamientos complejos como implantes y ortodoncia, estamos comprometidos con tu bienestar dental. 
        Nuestros servicios incluyen diagnósticos digitales de última generación, planes de tratamiento personalizados y un ambiente acogedor 
        diseñado para minimizar cualquier ansiedad relacionada con el dentista. 
        ¡Reserva tu cita hoy y da el primer paso hacia una sonrisa saludable y brillante!
      `,
      image: 'https://images.pexels.com/photos/4269942/pexels-photo-4269942.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  constructor(private router: Router) { }

  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Detiene la propagación del clic
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Método para evitar el cierre al hacer clic dentro del dropdown
  stopPropagation(event: Event): void {
    event.stopPropagation(); // Evita que el clic dentro del menú cierre el desplegable
  }

  // Detecta clics fuera del dropdown
  @HostListener('document:click', ['$event'])
  closeOnClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.menu-dropdown');
    const menuButton = document.querySelector('.menu-button'); // Si tienes un botón específico

    // Cierra el dropdown si se hace clic fuera de él y del botón
    if (dropdown && !dropdown.contains(target) && !menuButton?.contains(target)) {
      this.isDropdownOpen = false;
    }

    // Cierra el menú si se hace clic fuera
    const menu = document.querySelector('.menu');
    if (menu && !menu.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  goToCompanyDetails(id: number): void {
    this.router.navigate([`/client/company`, id]); // Navega a la página de detalles de la empresa
  }
}
