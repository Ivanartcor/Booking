import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { CompanyStatisticsService } from 'src/app/core/services/company-statistics.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  services: any[] = [];
  company: any = null;
  companyId: number = 0;
  statistics: any = null;


  showServiceDetailsModal = false;
  showAddServiceModal = false;
  selectedServiceId: number | null = null;

  errors: string[] = [];

// Configuración de gráficos
appointmentsOptions: any;
ratingOptions: any;
activeClientsOptions: any;

isScreenLarge: boolean = true; // Para cambiar la disposición de estadísticas

  
  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private companyService: CompanyService,
    private statisticsService: CompanyStatisticsService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'company') {
      this.companyId = currentUser.company.id;
      this.loadCompanyInfo();
      this.loadServices();
      this.loadStatistics();
    } else {
      this.errors.push('No se pudo obtener la empresa. Inicie sesión nuevamente.');
    }
  }

    /** 🔹 Detectar cambios en el tamaño de la pantalla */
    @HostListener('window:resize', ['$event'])
    detectScreenSize() {
      this.isScreenLarge = window.innerWidth > 1024; // Cambia disposición en pantallas grandes
    }

  /** 🔹 Cargar información de la empresa */
  loadCompanyInfo(): void {
    if (this.companyId) {
      this.companyService.getCompanyById(this.companyId).subscribe(
        (company) => {
          this.company = company;
        },
        () => this.errors.push('Error al obtener la información de la empresa.')
      );
    }
  }

  /** 🔹 Cargar servicios de la empresa */
  loadServices(): void {
    if (this.companyId) {
      this.serviceService.getServicesByCompany(this.companyId).subscribe(
        (services) => this.services = services,
        () => this.errors.push('Error al obtener los servicios.')
      );
    }
  }

    /** 🔹 Cargar estadísticas y generar gráficos */
    loadStatistics(): void {
      this.statisticsService.getStatisticsByCompanyId(this.companyId).subscribe(
        (stats) => {
          this.statistics = stats;
          if (this.statistics.average_rating === null) {
            this.statistics.average_rating = 0.0; // Si no hay rating, mostrar 0.0
          }
          this.generateCharts();
        },
        () => this.errors.push('Error al obtener las estadísticas.')
      );
    }


 /** 🔹 Generar gráficos con ECharts */
 generateCharts(): void {
  if (!this.statistics) return;

  // 📊 Gráfico de citas (Barras)
  this.appointmentsOptions = {
    
    tooltip: {},
    xAxis: { type: 'category', data: ['Total', 'Completadas', 'Canceladas'] },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: [
        this.statistics.total_appointments,
        this.statistics.completed_appointments,
        this.statistics.canceled_appointments
      ],
      itemStyle: { color: '#3498db' }
    }]
  };

  // ⭐ Gráfico de calificaciones (Gauge)
  this.ratingOptions = {
    
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 5,
        detail: { formatter: '{value}★' },
        data: [{ value: this.statistics.average_rating, name: 'Rating' }],
        axisLine: { lineStyle: { color: [[0.4, '#e74c3c'], [0.7, '#f1c40f'], [1, '#2ecc71']] } }
      }
    ]
  };

  this.activeClientsOptions = {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'], // 📌 Define el tamaño del anillo
        data: [{ value: this.statistics.active_clients, name: 'Clientes Activos' }],
        itemStyle: { color: '#8e44ad' },
        label: {
          position: 'center', // 📌 Centrar el texto en el gráfico
          formatter: '{c}', // 📌 Mostrar solo el valor numérico
          fontSize: 18, // 📌 Tamaño del número en el centro
          fontWeight: 'bold',
          color: '#8e44ad'
        },
        emphasis: {
          label: {
            fontSize: 22, // 📌 Aumentar el tamaño cuando el usuario pase el mouse
            fontWeight: 'bold',
            color: '#2c3e50' // 📌 Color más oscuro para resaltar
          }
        }
      }
    ]
  };
}

ngAfterViewInit(): void {
  setTimeout(() => {
    this.generateCharts();
  }, 500); // Espera 500ms para asegurar que el DOM está listo
}

  /** 🔹 Abrir modal de detalles de servicio */
  openServiceDetails(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.showServiceDetailsModal = true;
  }

  /** 🔹 Cerrar modal de detalles de servicio */
  closeServiceDetailsModal(): void {
    this.showServiceDetailsModal = false;
    this.selectedServiceId = null;
  }

  /** 🔹 Abrir modal para agregar servicio */
  openAddServiceModal(): void {
    this.showAddServiceModal = true;
  }

  /** 🔹 Cerrar modal de agregar servicio */
  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
  }

  /** 🔹 Cuando se añade un servicio, recargar la lista */
  onServiceAdded(newService: any): void {
    this.services.push(newService);
    this.closeAddServiceModal();
  }
}
