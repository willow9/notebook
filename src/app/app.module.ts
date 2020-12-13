import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
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
    materialModules

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
