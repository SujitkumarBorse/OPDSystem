import { BillingService } from './services/billing/billing.service';
import { AppointmentService } from './services/appointment/appointment.service';
import { PatientService } from './services/patient/patient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerModule } from "angular-io-datepicker";
import { OverlayModule } from "angular-io-overlay";

import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http/http.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AlertService } from './services/alert/alert.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user/user.service';
import { HttpModule } from '@angular/http';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './patients/add-patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BillingComponent } from './billing/billing.component';
import { AccountComponent } from './account/account.component';
import { ClinicTestComponent } from './clinic-test/clinic-test.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PatientsComponent,
    AddPatientComponent,
    AppointmentComponent,
    BillingComponent,
    AccountComponent,
    ClinicTestComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DatePickerModule,
    OverlayModule
  ],
  providers: [
    AuthGuard,
    HttpService,
    AuthenticationService,
    AlertService,
    UserService,
    PatientService,
    AppointmentService,
    BillingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
