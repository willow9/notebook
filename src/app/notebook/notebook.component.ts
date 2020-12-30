import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthFacade } from "./../store/facades/auth.facade";

@Component({
  selector: "app-notebook",
  templateUrl: "./notebook.component.html",
  styleUrls: ["./notebook.component.css"],
})
export class NotebookComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  logedInUser = false;
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.userSub = this.authFacade.user$.subscribe(user => {
      this.logedInUser = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
