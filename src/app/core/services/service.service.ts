import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/services'; // URL base de la API de servicios

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los servicios */
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Servicios obtenidos')),
      catchError(error => {
        console.error('Error obteniendo servicios:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener un servicio por ID */
  getServiceById(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${serviceId}`).pipe(
      tap(() => console.log(`Servicio obtenido ID: ${serviceId}`)),
      catchError(error => {
        console.error(`Error obteniendo servicio ID: ${serviceId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Obtener servicios de una empresa por `companyId` */
getServicesByCompany(companyId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/company/${companyId}`).pipe(
    tap(() => console.log(`Servicios obtenidos para la empresa ID: ${companyId}`)),
    catchError(error => {
      console.error(`Error obteniendo servicios de la empresa ID: ${companyId}`, error);
      return of([]);
    })
  );
}


  /** 🔹 Crear un nuevo servicio */
  createService(serviceData: any): Observable<any> {
    return this.http.post(this.apiUrl, serviceData).pipe(
      tap(() => console.log('Servicio creado con éxito')),
      catchError(error => {
        console.error('Error creando servicio:', error);
        return of(null);
      })
    );
  }

  /** 🔹 Actualizar un servicio existente */
  updateService(id: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateData).pipe(
      tap(() => console.log(`Servicio actualizado ID: ${id}`)),
      catchError(error => {
        console.error(`Error actualizando servicio ID: ${id}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar un servicio */
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Servicio eliminado ID: ${id}`)),
      catchError(error => {
        console.error(`Error eliminando servicio ID: ${id}`, error);
        return of();
      })
    );
  }
}
