import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Injectable()
export class AuthenticationService {

    apiRegistrationUrl = 'http://localhost:9000/opd-api/v1/users';
    apiLoginUrl = 'http://localhost:9000/opd-api/v1/users/login';
   
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post(this.apiLoginUrl, { email: username, password: password })
            .map((response: Response) => {
              console.log("Response after login ", response);
                // login successful if there's a jwt token in the response
                // let user = response.json();
                // if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response));
                // }
            });
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

}