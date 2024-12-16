import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesUrl = 'assets/data/companies.json';
  private categoriesUrl = 'assets/data/companies_categories.json';
  private citiesUrl = 'assets/data/companies_cities.json';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.companiesUrl);
  }

  getCompanyById(companyId: number): Observable<any> {
    return this.http.get<any[]>(this.companiesUrl).pipe(
      map((companies) => companies.find((c) => c.id === companyId))
    );
  }

  getCompanyServices(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(this.companiesUrl).pipe(
      map((companies) => {
        const company = companies.find((c) => c.id === companyId);
        return company?.services || [];
      })
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.citiesUrl);
  }
}
