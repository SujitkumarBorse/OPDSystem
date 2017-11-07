import { PatientService } from '../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientForm: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private authService: AuthenticationService) { }

  cancel() {
    this.router.navigate(['app/patient']);
  }


 validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return !re.test(email);
}

  savePatient() {


    
    if ( this.patientForm.dirty && this.patientForm.valid ){
    
      let data = this.patientForm.getRawValue();
      if(this.validateEmail(data.contact.email)){
        alert("Please enter valid email id.");
        return;
      }



      const user = this.authService.getUser();
      data.doctorId = user._id;
      this.patientService.save(data).subscribe((response) => {
        console.log("After patient save : ", response);
        this.router.navigate(['app/patient']);
      });
    } else {
      alert("Please enter mandatory fields marked with *.");
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressChar(event: any) {
    const pattern = /[a-zA-Z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'middleName': new FormControl(''),
      'lastName': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'dob': new FormControl(''),
      'contact': this.formBuilder.group({
        'mobile': new FormControl('', Validators.required),
        'email': new FormControl('')
      }),
      'address': this.formBuilder.group({
        "address": new FormControl(''),
        "city": new FormControl(''),
        "state": new FormControl(''),
        "country": new FormControl('India'),
        "zip": new FormControl('')
      })
    });
  }

}
