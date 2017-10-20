import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './patients/add-patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BillingComponent } from './billing/billing.component';
import { AccountComponent } from './account/account.component';
import { ClinicTestComponent } from './clinic-test/clinic-test.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
    { path: '', redirectTo: "/login", pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'app', component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'patient', component: PatientsComponent },
            { path: 'patient/add', component: AddPatientComponent },
            { path: 'appointment', component: AppointmentComponent },
            { path: 'appointment/add', component: AppointmentComponent },
            { path: 'bill', component: BillingComponent },
            { path: 'account', component: AccountComponent },
            { path: 'clinical-tests', component: ClinicTestComponent }
        ]
    },
    // otherwise redirect to login
    { path: '**', redirectTo: '/login' }
];

export const Routing = RouterModule.forRoot(appRoutes);