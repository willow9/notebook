import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as fromAppReducer from "./../store/reducers/app.reducer";
import { getUser } from "../store/selectors/auth.selectors";

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
    this.userSub = this.store.pipe(select(getUser)).subscribe(user => {
      this.logedInUser = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
