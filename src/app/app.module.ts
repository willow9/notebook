import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { LayoutModule } from "@angular/cdk/layout";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";

import { NotebookComponent } from "./notebook/notebook.component";
import { RecordsListComponent } from "./notebook/records-list/records-list.component";
import { AddRecordComponent } from "./notebook/add-record/add-record.component";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthorizationComponent } from "./authorization/authorization.component";

import { AuthInterceptorService } from "./interceptors/auth-interceptor.service";
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
