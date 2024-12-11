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
      description: `
        En un rincón especializado lleno de amabilidad y estilo, Peluquería Lola destaca por su atención personalizada. 
        Ofrecemos servicios de calidad para el cuidado del cabello, con productos 100% orgánicos y profesionales altamente capacitados. 
        Disfruta de cortes modernos, peinados para ocasiones especiales, tintes personalizados y tratamientos capilares avanzados. 
        Además, garantizamos un ambiente cómodo y relajante. ¡Reserva tu cita ahora y vive una experiencia única en el cuidado de tu cabello!
      `,
      services: [
        { id: 1, name: 'Corte de pelo', price: 12.0, reserved: false },
        { id: 2, name: 'Tinte', price: 25.0, reserved: false },
        { id: 3, name: 'Peinado', price: 18.0, reserved: false },
      ],
    },
    {
      id: 2,
      name: 'Vitaldent',
      description: `
        Tu sonrisa es nuestra prioridad. Con tecnología avanzada y un equipo experto, Vitaldent ofrece servicios de alta calidad en odontología. 
        Desde limpiezas dentales de rutina hasta tratamientos complejos como implantes y ortodoncia, estamos comprometidos con tu bienestar dental. 
        Nuestros servicios incluyen diagnósticos digitales de última generación, planes de tratamiento personalizados y un ambiente acogedor 
        diseñado para minimizar cualquier ansiedad relacionada con el dentista. 
        ¡Reserva tu cita hoy y da el primer paso hacia una sonrisa saludable y brillante!
      `,
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
