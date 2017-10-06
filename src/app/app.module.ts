import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    HttpService,
    AuthenticationService,
    AlertService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
