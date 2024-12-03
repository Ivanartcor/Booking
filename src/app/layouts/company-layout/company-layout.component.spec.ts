import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLayoutComponent } from './company-layout.component';

describe('CompanyLayoutComponent', () => {
  let component: CompanyLayoutComponent;
  let fixture: ComponentFixture<CompanyLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyLayoutComponent]
    });
    fixture = TestBed.createComponent(CompanyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
