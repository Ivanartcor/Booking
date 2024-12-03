import { Component } from '@angular/core';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {
  isMenuOpen = false;
  isDropdownOpen: boolean = false;

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
}
