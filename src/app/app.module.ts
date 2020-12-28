import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { EffectsModule } from "@ngrx/effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { NotebookComponent } from "./notebook/notebook.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecordsListComponent } from "./notebook/records-list/records-list.component";
import { AddRecordComponent } from "./notebook/add-record/add-record.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { LayoutModule } from "@angular/cdk/layout";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { MatPaginatorModule } from "@angular/material/paginator";

import { RecordsEffects } from "./store/effects/records.effects";
import { AuthEffects } from "./store/effects/auth.effects";
import * as fromAppReducer from "./store/reducers/app.reducer";

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
  MatTableModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorizationComponent,
    NotebookComponent,
    RecordsListComponent,
    AddRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([RecordsEffects, AuthEffects]),
    materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
