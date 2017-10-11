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
    this.user = this.authService.getUser();
  }
  
  ngOnChanges() {
    this.user = this.authService.getUser();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }





}
