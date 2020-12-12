import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';

const materialModules = [MatToolbarModule]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    materialModules

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
