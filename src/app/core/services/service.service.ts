import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private servicesUrl = 'assets/data/services.json';
  private services: any[] = [];

  constructor(private http: HttpClient) {
    this.loadServices();
  }

  private loadServices(): void {
    this.http.get<any[]>(this.servicesUrl).subscribe((services) => {
      this.services = services;
    });
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.servicesUrl).pipe(
      map((services) => {
        this.services = services;
        return services;
      })
    );
  }

  getServicesByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(this.servicesUrl).pipe(
      map((services) => services.filter((s) => s.companyId === companyId))
    );
  }

  getServicesByIds(serviceIds: number[]): Observable<any[]> {
    return this.http.get<any[]>(this.servicesUrl).pipe(
      map((services) => services.filter((s) => serviceIds.includes(s.id)))
    );
  }

  getServiceById(serviceId: number): Observable<any> {
    return this.http.get<any[]>(this.servicesUrl).pipe(
      map((services) => services.find((s) => s.id === serviceId))
    );
  }


  createService(newService: any): Observable<any> {
    newService.id = this.services.length + 1; // Genera un ID único temporalmente
    this.services.push(newService); // Agrega al array de servicios
    console.log('Servicio creado:', newService);
    return of(newService); // Simula una respuesta del servidor
  }
  


  deleteService(serviceId: number): Observable<boolean> {
    const serviceIndex = this.services.findIndex((s) => s.id === serviceId);
    if (serviceIndex !== -1) {
      this.services.splice(serviceIndex, 1);
      console.log(`Servicio con ID ${serviceId} eliminado.`);
      return of(true);
    }
    return of(false);
  }
}
