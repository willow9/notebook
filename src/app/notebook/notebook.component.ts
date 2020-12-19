import { AuthService } from "./../authService";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-notebook",
  templateUrl: "./notebook.component.html",
  styleUrls: ["./notebook.component.css"],
})
export class NotebookComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  logedInUser = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.logedInUser = !user ? null : true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
