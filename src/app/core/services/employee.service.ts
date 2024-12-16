import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = 'assets/data/employees.json';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeesUrl);
  }

  getEmployeesByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(this.employeesUrl).pipe(
      map((employees) => employees.filter((e) => e.companyId === companyId))
    );
  }

  getEmployeesByIds(employeeIds: number[]): Observable<any[]> {
    return this.http.get<any[]>(this.employeesUrl).pipe(
      map((employees) => employees.filter((e) => employeeIds.includes(e.id)))
    );
  }
}
