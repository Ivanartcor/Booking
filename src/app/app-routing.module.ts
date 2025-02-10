import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './features/faq/faq.component'; // Asegúrate de que la ruta sea correcta
import { PoliticaPrivacidadComponent } from './features/politica-privacidad/politica-privacidad.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule),
    data: { role: 'client' },
  },
  {
    path: 'company',
    loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule),
    data: { role: 'company' },
  },
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule),
    data: { role: 'employee' },
  },
  { path: 'faq', component: FaqComponent }, // Ruta para el componente FAQ

  { path: 'politicas', component: PoliticaPrivacidadComponent},
  
  // Ruta predeterminada
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  // Ruta comodín para manejar cualquier ruta no definida
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

