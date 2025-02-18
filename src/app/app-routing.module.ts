import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './features/faq/faq.component'; // Asegúrate de que la ruta sea correcta
import { PoliticaPrivacidadComponent } from './features/politica-privacidad/politica-privacidad.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard], // 🔹 Protegemos con AuthGuard
    data: { role: 'client' },  // 🔹 Solo accesible para clientes
  },
  {
    path: 'company',
    loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule),
    canActivate: [AuthGuard], // 🔹 Protegemos con AuthGuard
    data: { role: 'company' }, // 🔹 Solo accesible para empresas
  },
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard], // 🔹 Protegemos con AuthGuard
    data: { role: 'employee' }, // 🔹 Solo accesible para empleados
  },
  { path: 'faq', component: FaqComponent }, 
  { path: 'politicas', component: PoliticaPrivacidadComponent },
  { path: 'contacto', component: ContactoComponent }, 
  
  // Ruta predeterminada (redirige al login si no hay autenticación)
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Ruta comodín para manejar cualquier ruta no definida
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }