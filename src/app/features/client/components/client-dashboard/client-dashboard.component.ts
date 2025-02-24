import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { CityService } from 'src/app/core/services/city.service';
import { CompanyCategoryService } from 'src/app/core/services/company-category.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  isMenuOpen = false;
  isDropdownOpen = false;
  selectedCategory: number | null = null;
  selectedCity: number | null = null;
  searchQuery = '';

  companies: any[] = [];
  filteredCompanies: any[] = [];
  categories: any[] = [];
  cities: any[] = [];
  companyCategories: any[] = [];

  cookiesAccepted: boolean = false;

  constructor(
    private router: Router, 
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private cityService: CityService,
    private companyCategoryService: CompanyCategoryService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadCategories();
    this.loadCities();
    this.loadCompanyCategories();

    // Verificar si las cookies han sido aceptadas
    this.cookiesAccepted = !!localStorage.getItem('cookiesAccepted');
  }

  /** 🔹 Cargar todas las empresas y procesarlas */
  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies.map(company => ({
        ...company,
        cityId: company.addresses?.[0]?.city?.id ?? null, // Obtiene el ID de la ciudad desde la primera dirección
      }));
      this.applyFilters();
    });
  }

  /** 🔹 Cargar todas las categorías */
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  /** 🔹 Cargar todas las ciudades */
  loadCities(): void {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  /** 🔹 Cargar asociaciones entre empresas y categorías */
  loadCompanyCategories(): void {
    this.companyCategoryService.getCompanyCategories().subscribe((data) => {
      this.companyCategories = data;
      this.applyFilters();
    });
  }

  /** 🔹 Aplicar filtros de búsqueda */
  applyFilters(): void {
    this.filteredCompanies = this.companies.filter(company => {
      const matchesCategory = this.selectedCategory 
        ? this.companyCategories.some(cc => cc.companyId === company.id && cc.categoryId === this.selectedCategory)
        : true;

      const matchesCity = this.selectedCity ? company.cityId === this.selectedCity : true;
      const matchesSearchQuery = company.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesCategory && matchesCity && matchesSearchQuery;
    });
  }

  /** 🔹 Seleccionar una categoría */
  selectCategory(event: Event, categoryId: number | null): void {
    event.preventDefault();
    this.selectedCategory = categoryId;
    this.isDropdownOpen = false;
    this.applyFilters();
  }

  /** 🔹 Seleccionar una ciudad */
  selectCity(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCity = target.value ? Number(target.value) : null;
    this.applyFilters();
  }

  /** 🔹 Redirigir a los detalles de una empresa */
  goToCompanyDetails(id: number): void {
    this.router.navigate([`/client/company`, id]);
  }

  /** 🔹 Alternar el menú desplegable */
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /** 🔹 Alternar el menú */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** 🔹 Evitar que el evento se propague */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  /** 🔹 Cerrar el menú y dropdown al hacer clic fuera */
  @HostListener('document:click', ['$event'])
  closeOnClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-dropdown') && !target.closest('.menu-btn')) {
      this.isDropdownOpen = false;
    }
    if (!target.closest('.menu')) {
      this.isMenuOpen = false;
    }
  }
}
