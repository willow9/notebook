import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthFacade } from "./../store/facades/auth.facade";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  logedInUser = false;

  constructor(private router: Router, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.userSub = this.authFacade.user$.subscribe(user => {
      this.logedInUser = !!user;
    });
  }

  logout(): void {
    this.authFacade.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
