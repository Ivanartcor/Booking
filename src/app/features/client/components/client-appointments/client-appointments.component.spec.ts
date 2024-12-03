import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentsComponent } from './client-appointments.component';

describe('ClientAppointmentsComponent', () => {
  let component: ClientAppointmentsComponent;
  let fixture: ComponentFixture<ClientAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAppointmentsComponent]
    });
    fixture = TestBed.createComponent(ClientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
