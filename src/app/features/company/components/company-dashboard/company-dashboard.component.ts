import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {
  // Array de servicios
  services = [
    {
      title: 'Consulta Médica',
      description: 'Consulta con médicos especializados en diversas áreas para atender tus necesidades de salud.',
      imageUrl: '/assets/images/service1.jpg'
    },
    {
      title: 'Urgencias',
      description: 'Atención inmediata para casos de urgencia y emergencias médicas las 24 horas del día.',
      imageUrl: '/assets/images/service2.jpg'
    },
    {
      title: 'Consultas a Domicilio',
      description: 'Ofrecemos consultas médicas en la comodidad de tu hogar, para mayor comodidad y atención.',
      imageUrl: '/assets/images/service3.jpg'
    }
  ];
}
