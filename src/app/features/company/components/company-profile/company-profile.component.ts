import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent {
  @Output() close = new EventEmitter<void>();

  services = [
    {
      id: 1,
      company: 'Empresa',
      service: 'Corte de pelo',
      price: 12.0,
      date: new Date(2024, 8, 17), // Año, Mes (0-indexado), Día
      time: '10:15'
    },
    {
      id: 2,
      company: 'Mazón',
      service: 'Corte de pelo',
      price: 16.0,
      date: new Date(2024, 8, 17),
      time: '10:15'
    },
    {
      id: 3,
      company: 'Empresa',
      service: 'Corte de pelo',
      price: 12222.0,
      date: new Date(2024, 8, 18),
      time: '5:15'
    }
  ];
  closeModal() {
    this.close.emit(); // Emite un evento para notificar el cierre
  }
  cancelAppointment(id: number) {
    // Lógica para cancelar una cita (de momento, solo remueve de la lista)
    this.services = this.services.filter(services => services.id !== id);
  }
}

