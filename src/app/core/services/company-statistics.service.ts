import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyStatisticsService {
  private apiUrl = 'http://localhost:3000/company-statistics'; // URL base de la API

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener estadísticas de todas las empresas */
  getAllStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  /** 🔹 Obtener estadísticas de una empresa por ID */
  getStatisticsByCompanyId(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${companyId}`);
  }
}
