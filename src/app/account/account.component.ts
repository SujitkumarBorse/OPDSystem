import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AlertService } from '../services/alert/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.model = this.authService.getUser();
  }

  updateAccountInfo() {
    this.loading = true;
    console.log("Data to register user : ", this.model);
    
    if (this.model.password !== this.model.confirmPassword) {
      alert("Confirm password does not match.");
      return;
    }

    if (this.model.email && this.model.firstName && this.model.medicalRegistrationNo) {
      this.userService.update(this.model)
        .subscribe(
        data => {
          if (data && data.status === 'fail') {
            alert(data.message);
            this.router.navigate(['app/login']);
          } else {
            this.alertService.success('Registration successful', true);
            alert("Account information updated successfully.");
            this.router.navigate(['/app/patient']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    } else {
      alert("Please enter all mandatory fields.");
    }


  }

}
