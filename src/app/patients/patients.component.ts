import { Response } from '_debugger';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient/patient.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  searchText ="";
  totalPatients = 0;
  todaysAppointment = 0;
  whatTime = Observable.interval(1000).map(x => new Date()).share();
  patientList = [];
  constructor(private router: Router, private route: ActivatedRoute,
     private patientService: PatientService,
     private authService: AuthenticationService) { }

  addPatient() {
    this.router.navigate(['app/patient/add']);
  }

  ngOnInit() {
    
    const user = this.authService.getUser();
    this.patientService.getAll(user._id).subscribe((response) => {
      if(response.status === 'fail'){
        alert(response.message);
      }
      this.patientList = response;
      this.totalPatients = this.patientList.length;
    });
  }

  appointment(_id: String) {
    this.router.navigate(['app/appointment/add/'+ _id ]);
  }

}

