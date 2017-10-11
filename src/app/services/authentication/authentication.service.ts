import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {

    apiRegistrationUrl = 'http://localhost:9000/opd-api/v1/users';
    apiLoginUrl = 'http://localhost:9000/opd-api/v1/users/login';
    jwtHelper: JwtHelper = new JwtHelper();
    
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post(this.apiLoginUrl, { email: username, password: password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
      // remove user from local storage to log user out
      const d = JSON.parse(localStorage.getItem('currentUser'));
      return !!d;
    }

    getUser() {
        const token = JSON.parse(localStorage.getItem('currentUser'));
        return this.jwtHelper.decodeToken(token);
    }

}