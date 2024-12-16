import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.scss']
})
export class CompanyHeaderComponent {
  isDropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    console.log('Cerrando sesión...');
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const dropdown = document.querySelector('.nav-item.dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
}
