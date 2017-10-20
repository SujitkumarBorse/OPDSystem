import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  addPatient(){
    debugger;
    this.router.navigate(['app/patient/add']);
  }

  ngOnInit() {
  }

}
