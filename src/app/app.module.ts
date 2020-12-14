import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { NotebookComponent } from './notebook/notebook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const materialModules = [MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    RegisterComponent,
    NotebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    materialModules

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
