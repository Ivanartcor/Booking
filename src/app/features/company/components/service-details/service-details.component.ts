import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  serviceId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID del servicio desde la URL
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }
}
