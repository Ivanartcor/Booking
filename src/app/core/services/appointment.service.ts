import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsUrl = 'assets/data/appointments.json';
  private companiesUrl = 'assets/data/companies.json';
  private servicesUrl = 'assets/data/services.json';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.appointmentsUrl);
  }

  getAppointmentsByClient(clientId: number): Observable<any[]> {
    return forkJoin({
      appointments: this.http.get<any[]>(this.appointmentsUrl),
      companies: this.http.get<any[]>(this.companiesUrl),
      services: this.http.get<any[]>(this.servicesUrl),
    }).pipe(
      map(({ appointments, companies, services }) =>
        appointments
          .filter((a) => a.clientId === clientId)
          .map((a) => ({
            ...a,
            companyName: companies.find((c) => c.id === a.companyId)?.name || 'Desconocida',
            serviceName: services.find((s) => s.id === a.serviceId)?.name || 'Desconocido',
            price: services.find((s) => s.id === a.serviceId)?.price || 0,
          }))
      )
    );
  }

  cancelAppointment(appointmentId: number): Observable<boolean> {
    console.log(`Cancelando cita con ID: ${appointmentId}`);
    return new Observable((observer) => {
      // Simulación de cancelación
      observer.next(true);
      observer.complete();
    });
  }
}
