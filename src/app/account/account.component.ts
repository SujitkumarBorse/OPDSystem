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
  passwordModel: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.model = this.authService.getUser();
  }

  keyPressChar(event: any) {
    const pattern = /[a-zA-Z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
}

  updateAccountInfo() {
    this.loading = true;
    console.log("Data to register user : ", this.model);

    if (this.model.email && this.model.firstName && this.model.lastName && this.model.gender && this.model.medicalRegistrationNo) {
      this.userService.update(this.model).subscribe(
        data => {
          if (data && data.status === 'fail') {
            alert(data.message);
            this.router.navigate(['app/login']);
          } else {
            this.alertService.success('Registration successful', true);
            alert("Account information updated successfully. Changes will reflect in next login.");
            this.router.navigate(['/app/patient']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    } else {
      alert("Please enter all mandatory fields marked with *.");
    }


  }

  changePassword() {

    if (!this.passwordModel.currentPassword || !this.passwordModel.newPassword || !this.passwordModel.confirmPassword) {
      alert("Please enter all mandatory fields marked with *.");
      return;
    }
    if (this.passwordModel.newPassword !== this.passwordModel.confirmPassword) {
      alert("Confirm password does not match.");
      return;
    }

    this.passwordModel._id = this.model._id;
    this.passwordModel.email = this.model.email;
    this.userService.changePassword(this.passwordModel).subscribe(data => {
      if (data && data.status === 'fail' && data.message == 'Failed to authenticate token.') {
        alert(data.message);
        this.router.navigate(['app/login']);
      } else if (data && data.status === 'failed') {
        alert(data.message);
      } else {
        this.alertService.success('Password changed successfuly and can be used to next login.', true);
        alert('Password changed successfuly and can be used to next login.');
        this.router.navigate(['app/patient']);
      }
    },
      error => {
        this.alertService.error(error);
      });
  }

}
