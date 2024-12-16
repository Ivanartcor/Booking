import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private servicesUrl = 'assets/data/services.json';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.servicesUrl);
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
}
