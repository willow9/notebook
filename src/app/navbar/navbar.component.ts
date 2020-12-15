import { Router } from '@angular/router';
import { AuthService } from './../authService';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSub: Subscription
  logedInUser = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.logedInUser = !user ? null : true
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/"])
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()

  }

}
