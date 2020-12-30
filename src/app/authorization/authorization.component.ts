import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthFacade } from "./../store/facades/auth.facade";

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
  errorSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade
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
      this.authFacade.login({
        email: this.rForm.value.email,
        password: this.rForm.value.password,
      });

      this.handleAuth();
    }
  }

  registerUser(): void {
    if (this.rForm.status === "VALID") {
      this.authFacade.register({
        email: this.rForm.value.email,
        password: this.rForm.value.password,
      });
      this.handleAuth();
    }
  }
  private handleAuth() {
    this.userSub = this.authFacade.user$.subscribe(user => {
      if (user) {
        this.router.navigate(["notebook"]);
      }
    });
    this.errorSub = this.authFacade.errorMessage$.subscribe(error => {
      if (error) {
        this.error = error;
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
