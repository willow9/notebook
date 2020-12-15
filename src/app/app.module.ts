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
import { RecordsListComponent } from './notebook/records-list/records-list.component';
import { AddRecordComponent } from './notebook/add-record/add-record.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';

const materialModules = [
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  LayoutModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    RegisterComponent,
    NotebookComponent,
    RecordsListComponent,
    AddRecordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
