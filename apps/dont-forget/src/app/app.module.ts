import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesComponent } from './notes/notes.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TodosComponent } from './todos/todos.component';
import { TodosDetailsComponent } from './todos-details/todos-details.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NoteBlocksComponent } from './note-blocks/note-blocks.component';
import { authGuard } from './authGuard';
import { NoteBlocksDetailsComponent } from './note-blocks-details/note-blocks-details.component';
import { AuthInterceptor } from './AuthInterceptor';
import { RegisterComponent } from './register/register.component';
import { NoteblocksSharedComponent } from './noteblocks-shared/noteblocks-shared.component';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { SharewithComponent } from './sharewith/sharewith.component';
import { AddNoteblockComponent } from './add-noteblock/add-noteblock.component';
import { UpdateNoteblockComponent } from './update-noteblock/update-noteblock.component';
import { NoteblockSharedDetailsComponent } from './noteblock-shared-details/noteblock-shared-details.component';
import { AppendNotesComponent } from './append-notes/append-notes.component';
import { NotesSharedDetailsComponent } from './notes-shared-details/notes-shared-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    NotesComponent,
    IndexComponent,
    AboutComponent,
    NotesDetailsComponent,
    AddNoteComponent,
    UpdateNoteComponent,
    TodosComponent,
    TodosDetailsComponent,
    UpdateTodoComponent,
    AddTodoComponent,
    NoteBlocksComponent,
    NoteBlocksDetailsComponent,
    RegisterComponent,
    NoteblocksSharedComponent,
    FollowUserComponent,
    SharewithComponent,
    AddNoteblockComponent,
    UpdateNoteblockComponent,
    NoteblockSharedDetailsComponent,
    AppendNotesComponent,
    NotesSharedDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PdfViewerModule,
  ],
  providers: [
    authGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
