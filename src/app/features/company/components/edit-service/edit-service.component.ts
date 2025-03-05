import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {
  @Input() serviceId!: number;
  @Input() companyId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() serviceUpdated = new EventEmitter<any>();

  service = {
    name: '',
    description: '',
    type: 'in_person',
    price: 0,
    duration_minutes: 0,
    status: 'active',
  };

  employees: any[] = [];
  assignedEmployees: number[] = [];
  availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  availabilities: any[] = [];
  originalAvailabilities: any[] = [];
  errors: string[] = [];

  constructor(
    private serviceService: ServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadServiceDetails();
    this.loadEmployees();
  }

  /** 🔹 Cargar detalles del servicio */
  loadServiceDetails(): void {
    this.serviceService.getServiceById(this.serviceId).subscribe(
      (service) => {
        this.service = {
          name: service.name,
          description: service.description,
          type: service.type,
          price: service.price,
          duration_minutes: service.duration_minutes,
          status: service.status,
        };
        this.loadServiceAvailability();
        this.loadAssignedEmployees();
      },
      () => this.errors.push('Error al cargar los detalles del servicio.')
    );
  }

  /** 🔹 Cargar empleados SOLO de la empresa actual */
  loadEmployees(): void {
    this.authService.getEmployeesByCompany(this.companyId).subscribe(
      (employees) => {
        this.employees = employees; 
      },
      () => this.errors.push('Error al cargar los empleados de la empresa.')
    );
  }

  /** 🔹 Cargar empleados asignados al servicio */
  loadAssignedEmployees(): void {
    this.serviceService.getEmployeesByService(this.serviceId).subscribe(
      (employees) => {
        this.assignedEmployees = employees.map((e) => e.employee_id);
      },
      () => this.errors.push('Error al cargar los empleados asignados.')
    );
  }

  /** 🔹 Cargar disponibilidad del servicio */
  loadServiceAvailability(): void {
    this.serviceService.getAvailabilitiesByService(this.serviceId).subscribe(
      (availabilities) => {
        this.availabilities = availabilities || [];
        this.originalAvailabilities = JSON.parse(JSON.stringify(availabilities)); // 📌 Copia profunda
      },
      () => this.errors.push('Error al cargar la disponibilidad del servicio.')
    );
  }

  /** 🔹 Verificar si un día ya está marcado en la disponibilidad */
  isDayAvailable(day: string): boolean {
    return this.availabilities.some((a) => a.day_of_week === day);
  }

  /** 🔹 Seleccionar/Deseleccionar empleados */
  toggleEmployeeSelection(employeeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.assignedEmployees.push(employeeId);
    } else {
      this.assignedEmployees = this.assignedEmployees.filter((id) => id !== employeeId);
    }
  }

  /** 🔹 Seleccionar/Deseleccionar días de disponibilidad */
  toggleDaySelection(day: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      if (!this.isDayAvailable(day)) {
        this.availabilities.push({ 
          service: { id: this.serviceId },  // Relación correcta
          day_of_week: day, 
          start_time: '08:00', 
          end_time: '17:00',
          isNew: true  //  Marcarlo como nuevo
        });
      }
    } else {
      this.availabilities = this.availabilities.filter((a) => a.day_of_week !== day);
    }
  }
  

  /** 🔹 Validar formulario antes de actualizar */
  validateForm(): boolean {
    this.errors = [];

    if (!this.service.name.trim()) this.errors.push('El nombre es obligatorio.');
    if (!this.service.description.trim()) this.errors.push('La descripción es obligatoria.');
    if (this.service.price <= 0) this.errors.push('El precio debe ser mayor que 0.');
    if (this.service.duration_minutes <= 0) this.errors.push('La duración debe ser mayor que 0.');
    if (!this.assignedEmployees.length) this.errors.push('Debe asignar al menos un empleado.');

    return this.errors.length === 0;
  }

  /** 🔹 Actualizar servicio */
  updateService(): void {
    if (!this.validateForm()) return;

    this.serviceService.updateService(this.serviceId, this.service).subscribe(
      (updatedService) => {
        this.updateAssignedEmployees();
        this.updateAvailabilities();
        this.serviceUpdated.emit(updatedService);
        alert('Servicio actualizado con éxito.');
        this.closeModal();
      },
      () => this.errors.push('Error al actualizar el servicio.')
    );
  }

  /** 🔹 Actualizar empleados asignados */
  updateAssignedEmployees(): void {
    this.serviceService.getEmployeesByService(this.serviceId).subscribe((existingEmployees) => {
      const existingIds = existingEmployees.map((e) => e.employee_id);

      const employeesToAdd = this.assignedEmployees.filter((id) => !existingIds.includes(id));
      employeesToAdd.forEach((employeeId) => {
        this.serviceService.assignEmployeeToService(this.serviceId, employeeId).subscribe();
      });

      const employeesToRemove = existingIds.filter((id) => !this.assignedEmployees.includes(id));
      employeesToRemove.forEach((employeeId) => {
        this.serviceService.removeEmployeeFromService(this.serviceId, employeeId).subscribe();
      });
    });
  }

 

  /** 🔹 Cerrar modal */
  closeModal(): void {
    this.close.emit();
  }

    /** 🔹 Actualizar disponibilidad de un día */
    updateAvailability(day: string, field: 'start_time' | 'end_time', event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      const availability = this.availabilities.find(a => a.day_of_week === day);
    
      if (availability) {
        availability[field] = value; // Solo actualizar el valor localmente
      }
    }
    

    updateAvailabilities(): void {
      const requests: Observable<any>[] = [];
    
      // 📌 Buscar disponibilidades eliminadas y enviarlas al backend
      const deletedAvailabilities = this.originalAvailabilities.filter(
        original => !this.availabilities.some(a => a.day_of_week === original.day_of_week)
      );
    
      deletedAvailabilities.forEach(deleted => {
        requests.push(
          this.serviceService.deleteAvailability(deleted.id).pipe(
            tap(() => console.log(`🗑 Disponibilidad eliminada para ${deleted.day_of_week}`))
          )
        );
      });
    
      // 📌 Crear nuevas disponibilidades si son nuevas
      this.availabilities.forEach(availability => {
        if (availability.isNew) {
          requests.push(
            this.serviceService.createAvailability(availability).pipe(
              tap(createdAvailability => {
                console.log(`✔ Disponibilidad creada para ${availability.day_of_week}`, createdAvailability);
                availability.id = createdAvailability.id; // ✅ Asignar ID después de crearse
                delete availability.isNew; // ✅ Marcarla como no nueva
              })
            )
          );
        } else {
          // 📌 Actualizar disponibilidad existente
          requests.push(
            this.serviceService.updateAvailability(availability.id, availability).pipe(
              tap(() => console.log(`✔ Disponibilidad actualizada: ${availability.day_of_week}`))
            )
          );
        }
      });
    
      // 📌 Ejecutar todas las peticiones en paralelo
      Promise.all(requests.map(req => req.toPromise()))
        .then(() => console.log("✔ Todas las disponibilidades actualizadas y eliminadas correctamente"))
        .catch(() => this.errors.push("❌ Error al actualizar las disponibilidades"));
    }
    


}


