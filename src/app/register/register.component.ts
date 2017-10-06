import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;

        console.log("Data to register user : ", this.model);

        if(this.model.email && this.model.firstName && this.model.medicalRegistrationNo && this.model.password && this.model.confirmPassword){
            this.userService.create(this.model)
                .subscribe(
                    data => {
                        debugger;
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }else {
            alert("Please enter all mandatory fields.");
        }

        if(this.model.password !== this.model.confirmPassword){
            alert("Confirm password does not match.");
        }
    }
}
