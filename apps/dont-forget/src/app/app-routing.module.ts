import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import {IndexComponent} from "./index/index.component";
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { AboutComponent } from './about/about.component';
import { TodosComponent } from './todos/todos.component';
import { TodosDetailsComponent } from './todos-details/todos-details.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/:id', component: NotesDetailsComponent },
  { path: 'addnote', component: AddNoteComponent },
  { path: 'updatenote/:id', component: UpdateNoteComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'todos/:id', component: TodosDetailsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
