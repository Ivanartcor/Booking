
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: any;
  editCompany: any = {};
  showEditModal = false;
  companyId: number | null = null;

  constructor(
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  /** ✅ Cargar información de la empresa */
  loadCompany(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser?.company?.id != null) {  // Aseguramos que company.id no sea null ni undefined
      this.companyId = Number(currentUser.company.id); // Convertimos a número para asegurarnos

      this.companyService.getCompanyById(this.companyId).subscribe(
        (company) => {
          if (company) {
            this.company = company;
            this.editCompany = { ...company };
          } else {
            console.error('La empresa no se encontró en la base de datos.');
          }
        },
        (error) => console.error('Error cargando la empresa:', error)
      );
    } else {
      console.error('Error: No se encontró la empresa asociada al usuario.');
    }
  }

  /** ✅ Abrir modal de edición */
  openEditModal(): void {
    this.showEditModal = true;
  }

  /** ✅ Guardar cambios */
/** ✅ Guardar cambios */
saveChanges(): void {
  if (!this.companyId) return;

  // Filtramos los datos para no enviar relaciones
  const updateData = {
    name: this.editCompany.name,
    short_description: this.editCompany.short_description,
    phone: this.editCompany.phone,
    website: this.editCompany.website
  };

  this.companyService.updateCompany(this.companyId, updateData).subscribe(
    () => {
      this.company = { ...this.company, ...updateData }; // Solo actualizamos los campos necesarios
      this.showEditModal = false;
    },
    (error) => console.error('Error actualizando la empresa:', error)
  );
}


  /** ✅ Cerrar modal */
  closeEditModal(): void {
    this.showEditModal = false;
  }

  /** ✅ Subir logo */
  uploadLogo(event: Event): void {
    if (!this.companyId) return;

    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.companyService.uploadCompanyLogo(this.companyId, file).subscribe(
        (res) => this.company.logo = res.filePath,
        (error) => console.error('Error subiendo logo:', error)
      );
    }
  }

  /** ✅ Subir banner */
  uploadBanner(event: Event): void {
    if (!this.companyId) return;
  
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.companyService.uploadCompanyBanner(this.companyId, file).subscribe(
        (res) => {
          if (res && res.filePath) {
            this.company.banner_image = res.filePath; // Actualiza la imagen en la vista
          }
        },
        (error) => console.error('Error subiendo banner:', error)
      );
    }
  }
}
  









/*
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
    /*
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

// Fondo oscuro semitransparente detrás del modal
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  // Contenedor del modal
  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
  
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #333;
      cursor: pointer;
  
      &:hover {
        color: #437a90;
      }
    }
  
    .modal-title {
      text-align: center;
      font-size: 1.8rem;
      color: #437a90;
      margin-bottom: 1.5rem;
    }
  
    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
  
      .appointment-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f0f0f0;
        padding: 1rem;
        border-radius: 8px;
  
        .appointment-info {
          flex: 1;
  
          .appointment-company {
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
  
          .appointment-service {
            margin-bottom: 0.5rem;
          }
  
          .appointment-price {
            font-weight: bold;
            color: #333;
          }
        }
  
        .appointment-date {
          text-align: right;
  
          p {
            margin: 0;
            color: #437a90;
            font-size: 0.9rem;
          }
        }
  
        .cancel-btn {
          background-color: #437a90;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          margin-left: 15px;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
  
          &:hover {
            background-color: #365f72;
          }
        }
      }
    }
  }
  

*/


  //Isaac
  /* Estilos personalizados */
/* Asegúrate de que el body tenga el alto total y permita el scroll *
body {
  height: 100vh; /* Altura completa de la ventana *
  overflow-y: auto; /* Permite desplazamiento vertical *
  margin: 0; /* Elimina márgenes por defecto *
}

/* Contenedor principal *
.container {
  max-width: 1200px;
  margin: 0 auto; /* Centra el contenido 
  padding: 20px;
  height: 100%; /* Asegura que ocupe el 100% del alto disponible *
  overflow-y: auto; /* Activa scroll dentro del contenedor si el contenido es más alto *
}

.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}
/* Contenedor de la información de la empresa *
.card-body {
  overflow-y: auto; /* Permite desplazamiento en este bloque si es necesario *
  max-height: 70vh; /* Limita la altura y permite el scroll si es necesario *
}

.text-muted {
  font-size: 0.9rem;
  color: #6c757d;
}

.badge {
  font-size: 1rem;
}

.list-group-item {
  font-size: 1.1rem;
  padding: 10px 20px;
}

.list-group-item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.bg-primary {
  background-color: #437a90 !important;
}

.btn-primary {
  background-color: #437a90;  /* Color rojo para el fondo *
  border-color: #437a90;      /* Borde rojo *
}

.modal-footer .btn-primary:hover {
  background-color: #005f6b;  /* Color rojo oscuro al pasar el mouse *
  border-color: #005f6b;      /* Borde rojo oscuro *
}

/* Cambiar el color del botón de guardar *
.modal-footer .btn-primary {
  background-color: #437a90;  /* Color rojo para el fondo *
  border-color: #437a90;      /* Borde rojo *
}

.modal-footer .btn-primary:hover {
  background-color: #005f6b;  /* Color rojo oscuro al pasar el mouse *
  border-color: #005f6b;      /* Borde rojo oscuro *
}

/* Espaciado superior para el botón de editar *
.card-body .btn-primary {
  margin-top: 20px;  /* Aumenta la distancia entre el botón y la parte superior *
}



*/