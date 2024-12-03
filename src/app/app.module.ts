import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ClientHeaderComponent } from './layouts/client-layout/client-header/client-header.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { EmployeeHeaderComponent } from './layouts/employee-layout/employee-header/employee-header.component';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { CompanyHeaderComponent } from './layouts/company-layout/company-header/company-header.component';
import { ClientModule } from './features/client/client.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ClientLayoutComponent,
    ClientHeaderComponent,
    EmployeeLayoutComponent,
    EmployeeHeaderComponent,
    CompanyLayoutComponent,
    CompanyHeaderComponent,
    //para pruebas de navegación
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
