import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesComponent } from './notes/notes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TodosComponent } from './todos/todos.component';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
