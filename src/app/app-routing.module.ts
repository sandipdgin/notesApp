import { HomeComponent } from './home/home.component';
import { NotesHomeComponent } from './notes-home/notes-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo:"/home", pathMatch:"full" },
  { path: "home", component: HomeComponent },
  { path: "notes", component: NotesHomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
