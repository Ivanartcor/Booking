import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeesDetailsComponent } from './company-employees-details.component';

describe('CompanyEmployeesDetailsComponent', () => {
  let component: CompanyEmployeesDetailsComponent;
  let fixture: ComponentFixture<CompanyEmployeesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyEmployeesDetailsComponent]
    });
    fixture = TestBed.createComponent(CompanyEmployeesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
