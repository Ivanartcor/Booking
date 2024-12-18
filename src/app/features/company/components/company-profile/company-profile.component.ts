import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    const companyId = 2;  //Cambiar el ID dinámicamente según la empresa que mostrar
    this.companyService.getCompanyById(companyId).subscribe((data) => {
      this.company = data;
    });
  }
}