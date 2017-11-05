import { resolve } from 'url';
import { AppointmentService } from '../services/appointment/appointment.service';
import { PatientService } from '../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  appointmentModel = {
    patientId: '',
    dateTime: '',
    status: '',
    amountPaid: ''
  };
  patientDetails = {};
  patientId = "";
  isAddPage = false;
  appointmentList = [];

  statusList = [{
    id: 'scheduled',
    name: 'Scheduled'
  }, {
    id: 'inProgress',
    name: 'In Progress'
  }, {
    id: 'completed',
    name: 'Completed'
  }, {
    id: 'cancelled',
    name: 'Cancelled'
  }];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private appointmentService: AppointmentService) { }

  clear() {
    this.router.navigate(['app/appointment']);
  }

  cancel() {
    this.appointmentModel = {
      patientId: '',
      dateTime: '',
      status: '',
      amountPaid: ''
    };
    this.isAddPage = false;
  }

  editAppointment(data) {
    this.appointmentModel = data;
    // this.appointmentModel.dateTime = moment(data.dateTime).format("MMMM D, YYYY HH:mm A")
    this.patientId = this.appointmentModel.patientId;
    this.getPatientData();
    this.isAddPage = true;
  }

  // getDate(d){
  //   return (d && typeof(d) === 'string') ? moment(d).format("MMMM D, YYYY HH:mm A") : d;
  // }


  bookAppointment() {
    if (this.appointmentModel.dateTime && this.appointmentModel.status) {
      if (this.appointmentModel['_id']) {
        this.appointmentService.update(this.appointmentModel).subscribe((response) => {
          console.log("After appointment save : ", response);
          this.ngOnInit();
          this.appointmentModel = {
            patientId: '',
            dateTime: '',
            status: '',
            amountPaid: ''
          };
          this.isAddPage = false;
        });
      } else {
        this.appointmentModel.patientId = this.patientId;
        this.appointmentService.save(this.appointmentModel).subscribe((response) => {
          console.log("After appointment save : ", response);
          this.ngOnInit();
          this.appointmentModel = {
            patientId: '',
            dateTime: '',
            status: '',
            amountPaid: ''
          };
          this.isAddPage = false;
        });
      }
    } else {
      alert("Please enter valid data.");
    }
  }

  getPatientData() {
    this.patientService.getById(this.patientId).subscribe((response) => {
      console.log("After patient save : ", response);
      if (response && response.status === 'fail') {
        alert(response.message);
        this.router.navigate(['app/login']);
      } else {
        this.patientDetails = response;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      if (this.patientId) {
        this.isAddPage = true;
        this.getPatientData();
      }
    });

    // Get list of all appointments
    this.appointmentService.getAll().subscribe((response) => {
      console.log("Appointment List : ", response);

      if (response && response.status === 'fail') {
        alert(response.message);
        this.router.navigate(['app/login']);
      } else {
        response.forEach((element, idx, array) => {
          this.patientService.getById(element.patientId).subscribe((data) => {
            element.patientName = data.firstName + ' ' + data.lastName;
            element.patientMobile = data.contact.mobile;
          });
          if (idx === response.length - 1) {
            this.appointmentList = response;
          }
        });
      }

    });

  }

}
