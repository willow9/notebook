import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  rForm: FormGroup;
  credentials: any;
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  addCredentials(credentials) {
    this.email = credentials.email;
    this.password = credentials.password
  }

  loginUser(credentials) {
    console.log(credentials);

  }

  ngOnInit() {
  }

}
