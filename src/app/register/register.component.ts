import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  rForm: FormGroup;
  credentials: any;
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  addCredentials(credentials) {
    this.email = credentials.email;
    this.password = credentials.password
  }
  registerUser() {
    console.log(this.rForm);

  }


  ngOnInit() {
  }

}
