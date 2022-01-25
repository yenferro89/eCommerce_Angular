import { Router } from '@angular/router';
import { AppUser } from './../model/app-user';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;
  
  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  };

}
