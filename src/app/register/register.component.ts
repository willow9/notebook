import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  error: string = null

  constructor(private fb: FormBuilder, private regService: RegisterService, private router: Router) {
    this.rForm = fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }


  registerUser() {

    if (this.rForm.status === "VALID") {
      this.regService.signup(this.rForm.value.email, this.rForm.value.password).subscribe(resData => {
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

  ngOnInit() {
  }

}
