import * as AuthActions from "./../store/actions/auth.actions";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "../authService";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "./../store/reducers/app.reducer";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.css"],
})
export class AuthorizationComponent implements OnInit {
  rForm: FormGroup;
  error: string;
  title = "Sign in";
  hide = true;

  signInTogle = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      let authObs: Observable<AuthResponseData>;

      // eslint-disable-next-line prefer-const
      authObs = this.authService.login(
        this.rForm.value.email,
        this.rForm.value.password
      );

      authObs.subscribe(
        () => {
          this.router.navigate(["notebook"]);
        },

        errorMessage => {
          this.error = errorMessage;
          setTimeout(() => {
            this.error = null;
          }, 5000);
          console.log(errorMessage);
        }
      );
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
      this.store.select("authReducer").subscribe(state => {
        if (state.user) {
          this.router.navigate(["notebook"]);
        } else this.error = state.errorMessage;
      });
      // this.authService
      //   .signup(this.rForm.value.email, this.rForm.value.password)
      //   .subscribe(
      //     () => {
      //       this.rForm.reset();
      //       this.router.navigate(["notebook"]);
      //     },
      //     errorMessage => {
      //       this.error = errorMessage;
      //       setTimeout(() => {
      //         this.error = null;
      //       }, 5000);
      //       console.log(errorMessage);
      //     }
      //   );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
}
