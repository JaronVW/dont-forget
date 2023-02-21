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
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NoteBlocksComponent } from './note-blocks/note-blocks.component';
import { NoteBlocksDetailsComponent } from './note-blocks-details/note-blocks-details.component';
import { LoginActivateGuard } from './guards/login-activate.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent , },
  { path: 'notes', component: NotesComponent , canActivate:[LoginActivateGuard]},
  { path: 'notes/:id', component: NotesDetailsComponent , canActivate:[LoginActivateGuard] },
  { path: 'addnote', component: AddNoteComponent , canActivate:[LoginActivateGuard] },
  { path: 'updatenote/:id', component: UpdateNoteComponent , canActivate:[LoginActivateGuard] },
  { path: 'todos', component: TodosComponent , canActivate:[LoginActivateGuard] },
  { path: 'todos/:id', component: TodosDetailsComponent, canActivate:[LoginActivateGuard] },
  { path: 'updatetodo/:id', component: UpdateTodoComponent, canActivate:[LoginActivateGuard] },
  { path: 'addtodo', component: AddTodoComponent, canActivate:[LoginActivateGuard] },
  { path: 'noteblocks', component: NoteBlocksComponent, canActivate:[LoginActivateGuard] },
  { path: 'noteblocks/:id', component: NoteBlocksDetailsComponent, canActivate:[LoginActivateGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
