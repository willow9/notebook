import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../authService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  rForm: FormGroup;
  error: string

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.rForm = fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
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

  ngOnInit() { }



}


