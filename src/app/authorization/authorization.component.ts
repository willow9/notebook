import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthResponseData, AuthService } from '../authService';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  rForm: FormGroup;
  error: string;
  title: string = "Sign in";
  signInTogle: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.rForm = fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  togleSignIn(title: string) {
    this.signInTogle = !this.signInTogle
    this.title = title
  }

  loginUser() {
    if (this.rForm.status === "VALID") {
      let authObs: Observable<AuthResponseData>


      authObs = this.authService.login(this.rForm.value.email, this.rForm.value.password)

      authObs.subscribe(resData => {
        console.log(resData);
        this.router.navigate(["notebook"])

      },
        errorMessage => {
          this.error = errorMessage
          setTimeout(() => { this.error = null }, 5000)
          console.log(errorMessage);
        })
    }

  }

  registerUser() {

    if (this.rForm.status === "VALID") {
      this.authService.signup(this.rForm.value.email, this.rForm.value.password).subscribe(resData => {
        this.rForm.reset()
        this.router.navigate(["notebook"])
      },
        errorMessage => {
          this.error = errorMessage
          setTimeout(() => { this.error = null }, 5000)
          console.log(errorMessage);
        }
      )
    }

  }

  ngOnInit() { }



}


