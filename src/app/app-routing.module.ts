import { NotebookComponent } from './notebook/notebook.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from "./sign-in/sign-in.component"

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notebook', component: NotebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
