import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {


  services = [
    {
      name: 'Corte de cabello',
      price: 20,
      description: 'Corte de cabello de alta calidad con estilistas profesionales.',
    },
    {
      name: 'Blanqueamiento dental',
      price: 50,
      description: 'Tratamiento de blanqueamiento dental profesional para una sonrisa más brillante.',
    },
    {
      name: 'Masaje relajante',
      price: 30,
      description: 'Masaje terapéutico para aliviar el estrés y la tensión muscular.',
    }
  ];


}
