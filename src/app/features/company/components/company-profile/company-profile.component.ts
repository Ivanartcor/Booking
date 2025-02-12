import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: any;
  isModalOpen: boolean = false;  // Modal inicialmente cerrado
  categories: any[] = [];  // Para las categorías disponibles
  cities: any[] = [];  // Para las ciudades disponibles

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    const companyId = 2;  // Cambiar dinámicamente según la empresa que mostrar
    this.companyService.getCompanyById(companyId).subscribe((data) => {
      this.company = data;
    });

    // Cargar categorías y ciudades para los selectores
    this.companyService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.companyService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  // Abre el modal
  openEditModal(): void {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeEditModal(): void {
    this.isModalOpen = false;
  }

  // Método para guardar los datos editados
  onSubmitEdit(): void {
    // Aquí actualizas los datos localmente, ya que no se guarda en el servidor
    alert('Los datos de la empresa han sido guardados exitosamente.');

    // Cerrar el modal después de guardar
    this.closeEditModal();
  }

  // Evitar que el clic en el contenido del modal cierre el modal
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // Cierra el modal cuando se hace clic fuera del contenido del modal
  onModalBackgroundClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeEditModal();
    }
  }
}
