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
      map((companies) => {
        const company = companies.find((c) => c.id === companyId);
        return company ? this.addCityAndCategoryToCompany(company) : null;
      })
    );
  }

  getCompanyServices(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(this.companiesUrl).pipe(
      map((companies) => {
        const company = companies.find((c) => c.id === companyId);
        return company ? company.services : [];
      })
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.citiesUrl);
  }

  private addCityAndCategoryToCompany(company: any): any {
    // Asocia la ciudad a la empresa
    const city = this.getCityById(company.city);
    const category = this.getCategoryById(company.category);

    company.cityName = city ? city.name : '';
    company.categoryName = category ? category.name : '';
    
    return company;
  }

  private getCityById(cityId: string): any {
    // Busca la ciudad por su nombre (el id de la ciudad es un nombre en este caso)
    const cities = [
      { id: 1, name: 'Madrid' },
      { id: 2, name: 'Barcelona' },
      { id: 3, name: 'Valencia' },
      { id: 4, name: 'Sevilla' },
      { id: 5, name: 'Granada' },
      { id: 6, name: 'Londres' },
    ];
    return cities.find(city => city.name === cityId);
  }

  private getCategoryById(categoryId: string): any {
    // Busca la categoría por su nombre (el id de la categoría es un nombre en este caso)
    const categories = [
      { id: 1, name: 'Salud' },
      { id: 2, name: 'Estética' },
      { id: 3, name: 'Limpieza' },
      { id: 4, name: 'Soluciones Especiales' },
    ];
    return categories.find(category => category.name === categoryId);
  }
}
