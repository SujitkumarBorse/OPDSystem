import { Response } from '_debugger';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patientList = [];
  constructor(private router: Router, private route: ActivatedRoute, private patientService: PatientService) { }

  addPatient() {
    this.router.navigate(['app/patient/add']);
  }

  ngOnInit() {
    this.patientService.getAll().subscribe((response) => {
      if(response.status === 'fail'){
        alert(response.message);
      }
      this.patientList = response;
    });
  }

  appointment(_id: String) {
    this.router.navigate(['app/appointment/add/'+ _id ]);
  }

}

