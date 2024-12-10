import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: any;

  // Datos ficticios de empresas
  private companies = [
    {
      id: 1,
      name: 'Peluquería Lola',
      description: 'Servicios de cuidado capilar orgánico.',
      services: [
        { id: 1, name: 'Corte de pelo', price: 12.0, reserved: false },
        { id: 2, name: 'Tinte', price: 25.0, reserved: false },
        { id: 3, name: 'Peinado', price: 18.0, reserved: false },
      ],
    },
    {
      id: 2,
      name: 'Vitaldent',
      description: 'Cuida tu sonrisa con tecnología avanzada.',
      services: [
        { id: 1, name: 'Limpieza dental', price: 30.0, reserved: false },
        { id: 2, name: 'Implante', price: 1200.0, reserved: false },
        { id: 3, name: 'Ortodoncia', price: 3000.0, reserved: false },
      ],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const companyId = +this.route.snapshot.paramMap.get('id')!;
    this.company = this.companies.find((c) => c.id === companyId);
  }
  reserveService(serviceId: number): void {
    const service = this.company.services.find((s: any) => s.id === serviceId);
    if (service) {
      service.reserved = true; // Cambia el estado del servicio a reservado
    }
  }
}
