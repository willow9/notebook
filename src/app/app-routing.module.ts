import { AuthGuardService } from "./services/auth-guard.service";
import { NotebookComponent } from "./notebook/notebook.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";

const routes: Routes = [
  { path: "", component: AuthorizationComponent },
  {
    path: "notebook",
    component: NotebookComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
