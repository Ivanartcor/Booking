import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeesComponent } from './company-employees.component';

describe('CompanyEmployeesComponent', () => {
  let component: CompanyEmployeesComponent;
  let fixture: ComponentFixture<CompanyEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyEmployeesComponent]
    });
    fixture = TestBed.createComponent(CompanyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
