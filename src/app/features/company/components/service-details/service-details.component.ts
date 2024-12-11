import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() serviceId: number | null = null;
  @Output() close = new EventEmitter<void>();

  service: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.serviceId) {
      this.loadServiceDetails();
    }
  }

  loadServiceDetails() {
    this.http.get<any[]>('assets/data/services.json').subscribe((services) => {
      this.service = services.find((s) => s.id === this.serviceId);
    });
  }

  closeModal() {
    this.close.emit(); // Emite el evento de cierre
  }

  editService() {
    console.log('Editando servicio...');
  }

  deleteService() {
    console.log('Eliminando servicio...');
  }
}
