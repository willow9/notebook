import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "./../store/reducers/app.reducer";

@Component({
  selector: "app-notebook",
  templateUrl: "./notebook.component.html",
  styleUrls: ["./notebook.component.css"],
})
export class NotebookComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  logedInUser = false;
  constructor(private store: Store<fromAppReducer.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select("authReducer").subscribe(state => {
      this.logedInUser = !!state.user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
