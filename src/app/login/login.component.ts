import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { AlertService } from '../services/alert/alert.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(user => {
                console.log("Response after login ", user);
                debugger;
                // login successful if there's a jwt token in the response
                if (user && user['status'] == 'success' && user['token']) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user['token']));
                    this.router.navigate(['/app/home']);
                } else {
                    this.alertService.error(user['message']);
                    this.error = user['message'];
                }
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.error = error;
                this.loading = false;
            });
    }
}
