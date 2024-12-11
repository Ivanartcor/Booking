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
