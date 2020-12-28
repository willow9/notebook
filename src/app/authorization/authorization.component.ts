import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "./../store/reducers/app.reducer";
import * as AuthActions from "./../store/actions/auth.actions";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.css"],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  rForm: FormGroup;
  error: string;
  title = "Sign in";
  hide = true;

  signInTogle = true;
  userSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) {
    this.rForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  togleSignIn(title: string): void {
    this.signInTogle = !this.signInTogle;
    this.title = title;
  }

  loginUser(): void {
    if (this.rForm.status === "VALID") {
      this.store.dispatch(
        new AuthActions.SignInStarted({
          email: this.rForm.value.email,
          password: this.rForm.value.password,
        })
      );
      this.userSub = this.store.select("authReducer").subscribe(state => {
        if (state.user) {
          this.router.navigate(["notebook"]);
        } else this.error = state.errorMessage;
      });
    }
  }

  registerUser(): void {
    if (this.rForm.status === "VALID") {
      this.store.dispatch(
        new AuthActions.SignUpStarted({
          email: this.rForm.value.email,
          password: this.rForm.value.password,
        })
      );
      this.userSub = this.store.select("authReducer").subscribe(state => {
        if (state.user) {
          this.router.navigate(["notebook"]);
        } else this.error = state.errorMessage;
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
