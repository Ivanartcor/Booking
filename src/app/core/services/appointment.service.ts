import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments'; // URL base para citas
  private appointmentEmployeesUrl = 'http://localhost:3000/appointment-employees'; // URL para asignaciones de empleados

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

cancelAppointment(appointmentId: number): Observable<boolean> {
  return this.http.delete<void>(`${this.apiUrl}/${appointmentId}`).pipe(
    tap(() => console.log(`Cita cancelada ID: ${appointmentId}`)),
    map(() => true), // Devuelve `true` en caso de éxito
    catchError(error => {
      console.error(`Error cancelando cita ID: ${appointmentId}`, error);
      return of(false); // Devuelve `false` en caso de error
    })
  );
}


  /** 🔹 Obtener empleados asignados a una cita */
  getEmployeesByAppointment(appointmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.appointmentEmployeesUrl}/${appointmentId}`).pipe(
      tap(() => console.log(`Empleados obtenidos para la cita ID: ${appointmentId}`)),
      catchError(error => {
        console.error(`Error obteniendo empleados para la cita ID: ${appointmentId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener citas en las que participa un empleado */
  getAppointmentsByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.appointmentEmployeesUrl}/employee/${employeeId}`).pipe(
      tap(() => console.log(`Citas obtenidas para el empleado ID: ${employeeId}`)),
      catchError(error => {
        console.error(`Error obteniendo citas para el empleado ID: ${employeeId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Asignar un empleado a una cita */
  assignEmployeeToAppointment(appointmentId: number, employeeId: number): Observable<any> {
    return this.http.post<any>(this.appointmentEmployeesUrl, { appointmentId, employeeId }).pipe(
      tap(() => console.log(`Empleado ID: ${employeeId} asignado a la cita ID: ${appointmentId}`)),
      catchError(error => {
        console.error(`Error asignando empleado ID: ${employeeId} a la cita ID: ${appointmentId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una asignación de empleado de una cita */
  removeEmployeeFromAppointment(appointmentId: number, employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.appointmentEmployeesUrl}/${appointmentId}/${employeeId}`).pipe(
      tap(() => console.log(`Empleado ID: ${employeeId} eliminado de la cita ID: ${appointmentId}`)),
      catchError(error => {
        console.error(`Error eliminando empleado ID: ${employeeId} de la cita ID: ${appointmentId}`, error);
        return of();
      })
    );
  }

  /**
   * 🔹 Construye los parámetros de consulta para filtrar citas.
   */
  private buildQueryParams(filters?: any): string {
    if (!filters) return '';
    const queryParams = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '') // Evita valores vacíos o nulos
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    return queryParams ? `?${queryParams}` : '';
  }
}
