import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyCategoryService {
  private apiUrl = 'http://localhost:3000/company-categories'; // URL base para las relaciones empresa-categoría

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todas las asociaciones empresa-categoría */
  getCompanyCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Relaciones empresa-categoría obtenidas')),
      catchError(error => {
        console.error('Error obteniendo relaciones empresa-categoría:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener categorías de una empresa */
  getCategoriesByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/company/${companyId}`).pipe(
      tap(() => console.log(`Categorías obtenidas para empresa ID: ${companyId}`)),
      catchError(error => {
        console.error(`Error obteniendo categorías para empresa ID: ${companyId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener empresas de una categoría */
  getCompaniesByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`).pipe(
      tap(() => console.log(`Empresas obtenidas para categoría ID: ${categoryId}`)),
      catchError(error => {
        console.error(`Error obteniendo empresas para categoría ID: ${categoryId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Asignar una empresa a una categoría */
  assignCompanyToCategory(companyId: number, categoryId: number): Observable<any> {
    return this.http.post(this.apiUrl, { companyId, categoryId }).pipe(
      tap(() => console.log(`Empresa ID ${companyId} asignada a categoría ID ${categoryId}`)),
      catchError(error => {
        console.error(`Error asignando empresa ID ${companyId} a categoría ID ${categoryId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una relación empresa-categoría */
  removeCompanyFromCategory(companyId: number, categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${companyId}/${categoryId}`).pipe(
      tap(() => console.log(`Relación eliminada: Empresa ID ${companyId} - Categoría ID ${categoryId}`)),
      catchError(error => {
        console.error(`Error eliminando relación empresa ID ${companyId} - categoría ID ${categoryId}`, error);
        return of();
      })
    );
  }
}
