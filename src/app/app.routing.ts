import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { PatientsComponent } from './patients/patients.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BillingComponent } from './billing/billing.component';
import { AccountComponent } from './account/account.component';
import { ClinicTestComponent } from './clinic-test/clinic-test.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: '', redirectTo: "/login", pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'patient', component: PatientsComponent, canActivate: [AuthGuard] },
    { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard] },
    { path: 'bill', component: BillingComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'clinical-tests', component: ClinicTestComponent, canActivate: [AuthGuard] },
    // otherwise redirect to login
    { path: '**', redirectTo: '/login' }
];

export const Routing = RouterModule.forRoot(appRoutes);