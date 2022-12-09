import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dont-forget-navbar',
  template: `
    <header class=" p-5 flex justify-end items-center border-b-2 bg-stickyNoteBeige border-black mb-10">
      <h2 class=" px-3 mr-auto"><a [routerLink]="['/']"> <img src="assets/img/logo.png" class="w-6 float-left mx-3" alt=""> DontForget</a> </h2>
      <nav class="">
        <ul class="">
          <li class="list-none inline-block">
            <a class=" block px-3 " [routerLink]="['/login']">Login</a>
          </li>
          <li class="list-none inline-block">
            <a class=" block px-3 " [routerLink]="['/noteblocks']">NoteBlocks</a>
          </li>
          <li class="list-none inline-block">
            <a class=" block px-3 " [routerLink]="['/notes']">Notes</a>
          </li>
          <li class="list-none inline-block">
            <a class=" block px-3 " [routerLink]="['/todos']">Todos</a>
          </li>
          <li class="list-none inline-block">
            <a class="block px-3 " [routerLink]="['/about']">About</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    ('');
  }
}
