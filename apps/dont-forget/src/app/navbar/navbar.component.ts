import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dont-forget-navbar',
  template: `
    <header class=" p-5 flex justify-end items-center border-b-2 bg-stickyNoteBeige border-black mb-10">
      <h2 class=" px-3 mr-auto">DontForget</h2>
      <nav class="">
        <ul class="">
          <li class="list-none inline-block">
            <a class=" block px-3 " href="#">Login</a>
          </li>
          <li class="list-none inline-block">
            <a class=" block px-3 " href="#">Link</a>
          </li>
          <li class="list-none inline-block">
            <a class="block px-3 " href="#">Link</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    ('');
  }
}
