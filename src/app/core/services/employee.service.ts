import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = 'assets/data/employees.json'; // URL a empleados
  private specializationsUrl = 'assets/data/specializations.json'; // URL a especializaciones

  private employees: any[] = []; // Caché de empleados
  private specializations: any[] = []; // Caché de especializaciones

  constructor(private http: HttpClient) {
    this.loadEmployees(); // Carga inicial de empleados
    this.loadSpecializations(); // Carga inicial de especializaciones
  }

  /**
   * Carga empleados desde el archivo JSON
   */
  private loadEmployees(): void {
    this.http.get<any[]>(this.employeesUrl).subscribe((employees) => {
      this.employees = employees;
    });
  }

  /**
   * Carga especializaciones desde el archivo JSON
   */
  private loadSpecializations(): void {
    this.http.get<any[]>(this.specializationsUrl).subscribe((specs) => {
      this.specializations = specs;
    });
  }

  /**
   * Devuelve todos los empleados
   */
  getEmployees(): Observable<any[]> {
    return of(this.employees);
  }

  /**
   * Devuelve todos los empleados de una empresa
   */
  getEmployeesByCompany(companyId: number): Observable<any[]> {
    return of(this.employees.filter((e) => e.companyId === companyId));
  }

  /**
   * Devuelve empleados por IDs
   */
  getEmployeesByIds(employeeIds: number[]): Observable<any[]> {
    return of(this.employees.filter((e) => employeeIds.includes(e.id)));
  }

  /**
   * Crea un nuevo empleado
   */
  createEmployee(newEmployee: any): Observable<any> {
    const newId = Math.max(...this.employees.map((e) => e.id), 0) + 1;
    const employee = { ...newEmployee, id: newId };
    this.employees.push(employee);
    return of(employee); 
  }

  /**
   * Edita un empleado existente
   */
  editEmployee(updatedEmployee: any): Observable<boolean> {
    const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      return of(true); 
    }
    return of(false); 
  }

  /**
   * Elimina un empleado
   */
  deleteEmployee(employeeId: number): Observable<boolean> {
    const index = this.employees.findIndex((e) => e.id === employeeId);
    if (index !== -1) {
      this.employees.splice(index, 1); 
      return of(true); 
    }
    return of(false); 
  }

  /**
   * Devuelve todas las especializaciones
   */
  getSpecializations(): Observable<any[]> {
    return of(this.specializations); 
  }
}
