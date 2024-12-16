import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  isMenuOpen = false;
  isDropdownOpen = false;
  selectedCategory: string = '';
  selectedCity: string = '';

  companies: any[] = [];
  filteredCompanies: any[] = [];
  categories: any[] = [];
  cities: any[] = [];
//
  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadCategories();
    this.loadCities();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.applyFilters();
    });
  }

  loadCategories(): void {
    this.companyService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadCities(): void {
    this.companyService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  applyFilters(): void {
    this.filteredCompanies = this.companies.filter((company) => {
      const matchesCategory = this.selectedCategory
        ? company.category === this.selectedCategory
        : true;
      const matchesCity = this.selectedCity
        ? company.city === this.selectedCity
        : true;
      return matchesCategory && matchesCity;
    });
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
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

  selectCategory(event: Event, category: string): void {
    event.preventDefault();
    this.selectedCategory = category;
    this.isDropdownOpen = false;
    this.applyFilters();
  }

  selectCity(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedCity = target.value;
    }
    this.isDropdownOpen = false;
    this.applyFilters();
  }

  goToCompanyDetails(id: number): void {
    this.router.navigate([`/client/company`, id]);
  }
}
