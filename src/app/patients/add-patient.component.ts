import { PatientService } from '../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

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
    private patientService: PatientService) { }

  clear() {
    this.router.navigate(['app/patient']);
  }

  savePatient() {
    if ( this.patientForm.dirty && this.patientForm.valid ){
      this.patientService.save( this.patientForm.getRawValue()).subscribe((response) => {
        console.log("After patient save : ", response);
        this.router.navigate(['app/patient']);
      });
    } else {
      alert("Please enter valid data.");
    }
  }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'middleName': new FormControl(''),
      'lastName': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required),
      'contact': this.formBuilder.group({
        'mobile': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required)
      }),
      'address': this.formBuilder.group({
        "address": new FormControl('', Validators.required),
        "city": new FormControl('', Validators.required),
        "state": new FormControl('', Validators.required),
        "country": new FormControl('', Validators.required),
        "zip": new FormControl('')
      })
    });
  }

}
