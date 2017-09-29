import { AuthenticationService } from '../services/authentication/authentication.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {

  user: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  
  ngOnChanges() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }





}
