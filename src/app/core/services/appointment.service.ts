import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments'; // URL base para citas

  constructor(private http: HttpClient) { }

  /** 🔹 Obtener todas las citas con filtros opcionales */
  getAppointments(filters?: any): Observable<any[]> {
    const params = this.buildQueryParams(filters);

    return this.http.get<any[]>(`${this.apiUrl}${params}`).pipe(
      tap(() => console.log('Citas obtenidas con filtros:', filters)),
      catchError(error => {
        console.error('Error obteniendo citas:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una cita por ID */
  getAppointmentById(appointmentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${appointmentId}`).pipe(
      tap(() => console.log(`Cita obtenida ID: ${appointmentId}`)),
      catchError(error => {
        console.error(`Error obteniendo cita ID: ${appointmentId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Obtener citas de un cliente con filtros opcionales */
  getAppointmentsByClient(clientId: number, filters?: any): Observable<any[]> {
    const params = this.buildQueryParams(filters);

    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}${params}`).pipe(
      tap(() => console.log(`Citas obtenidas para cliente ID: ${clientId}`, filters)),
      catchError(error => {
        console.error(`Error obteniendo citas para cliente ID: ${clientId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener citas de una empresa con filtros opcionales */
  getAppointmentsByCompany(companyId: number, filters?: any): Observable<any[]> {
    const params = this.buildQueryParams(filters);

    return this.http.get<any[]>(`${this.apiUrl}/company/${companyId}${params}`).pipe(
      tap(() => console.log(`Citas obtenidas para empresa ID: ${companyId}`, filters)),
      catchError(error => {
        console.error(`Error obteniendo citas para empresa ID: ${companyId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Crear una nueva cita */
  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointmentData).pipe(
      tap(() => console.log('Cita creada con éxito')),
      catchError(error => {
        console.error('Error creando cita:', error);
        return of(null);
      })
    );
  }

  /** 🔹 Actualizar una cita existente */
  updateAppointment(appointmentId: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${appointmentId}`, updateData).pipe(
      tap(() => console.log(`Cita actualizada ID: ${appointmentId}`)),
      catchError(error => {
        console.error(`Error actualizando cita ID: ${appointmentId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Cancelar una cita */
  cancelAppointment(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${appointmentId}`).pipe(
      tap(() => console.log(`Cita cancelada ID: ${appointmentId}`)),
      catchError(error => {
        console.error(`Error cancelando cita ID: ${appointmentId}`, error);
        return of();
      })
    );
  }

  /**
  * 🔹 Construye los parámetros de consulta para filtrar citas.
  * @param filters Objeto con los filtros aplicados.
  * @returns String con parámetros de URL.
  */
  private buildQueryParams(filters?: any): string {
    if (!filters) return '';

    const queryParams = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '') // Evita valores vacíos o nulos
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`) // Convierte a string
      .join('&');

    return queryParams ? `?${queryParams}` : '';
  }


  /**
   * Ejemplo de uso de filtros
  const filters = {
  startDate: '2025-03-01',
  endDate: '2025-03-10',
  status: 'confirmed',
  paymentMethod: 'credit_card',
  clientId: 5,  // Número
  isActive: true // Booleano
};
   * 
   * 
   */
}
