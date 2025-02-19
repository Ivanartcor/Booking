import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/companies'; // URL base para las empresas

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todas las empresas */
  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Empresas obtenidas')),
      catchError(error => {
        console.error('Error obteniendo empresas:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una empresa por ID */
  getCompanyById(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${companyId}`).pipe(
      tap(() => console.log(`Empresa obtenida ID: ${companyId}`)),
      catchError(error => {
        console.error(`Error obteniendo empresa ID: ${companyId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Crear una nueva empresa */
  createCompany(companyData: any): Observable<any> {
    return this.http.post(this.apiUrl, companyData).pipe(
      tap(() => console.log('Empresa creada con éxito')),
      catchError(error => {
        console.error('Error creando empresa:', error);
        return of(null);
      })
    );
  }

  /** 🔹 Actualizar una empresa existente */
  updateCompany(id: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateData).pipe(
      tap(() => console.log(`Empresa actualizada ID: ${id}`)),
      catchError(error => {
        console.error(`Error actualizando empresa ID: ${id}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una empresa */
  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Empresa eliminada ID: ${id}`)),
      catchError(error => {
        console.error(`Error eliminando empresa ID: ${id}`, error);
        return of();
      })
    );
  }


  /** obtener empresas por id de la ciudad */
  getCompaniesByCity(cityId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-city/${cityId}`).pipe(
      tap(() => console.log(`Empresas obtenidas en la ciudad ID: ${cityId}`)),
      catchError(error => {
        console.error(`Error obteniendo empresas por ciudad ID: ${cityId}`, error);
        return of([]);
      })
    );
  }

}




/*
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

  editCompany(company: any): Observable<any> {
    return this.http.put<any>(`${this.companiesUrl}/${company.id}`, company);
  }
}
  */
