import { NotebookComponent } from "./notebook/notebook.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";

const routes: Routes = [
  { path: "", component: AuthorizationComponent },
  { path: "notebook", component: NotebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
