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

   /** ✅ Subir logo */
   uploadCompanyLogo(companyId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/${companyId}/logo`, formData).pipe(
      tap(() => console.log(`Logo actualizado para la empresa ID: ${companyId}`)),
      catchError(error => {
        console.error('Error subiendo logo:', error);
        return of(null);
      })
    );
  }

  /** ✅ Subir banner */
  uploadCompanyBanner(companyId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/${companyId}/banner`, formData).pipe(
      tap(() => console.log(`Banner actualizado para la empresa ID: ${companyId}`)),
      catchError(error => {
        console.error('Error subiendo banner:', error);
        return of(null);
      })
    );
  }

}


