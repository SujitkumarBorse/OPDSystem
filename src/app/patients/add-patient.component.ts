import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  clear() {
    this.router.navigate(['app/patient']);
  }

  ngOnInit() {
  }

}
