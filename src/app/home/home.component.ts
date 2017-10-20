import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalPatients = 0;
  todaysAppointment = 0;
  whatTime = Observable.interval(1000).map(x => new Date()).share();
  constructor() { }

  ngOnInit() {
  }

}
