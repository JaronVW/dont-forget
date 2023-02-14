import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dont-forget-navbar',
  template: `
    <header
      class=" p-5 flex justify-end items-center border-b-2 bg-stickyNoteBeige border-black mb-10"
    >
      <h2 class=" px-3 mr-auto">
        <a [routerLink]="['/']">
          <img src="assets/img/logo.png" class="w-6 float-left mx-3" alt="" />
          DontForget</a
        >
      </h2>
      <nav class="">
        <ul class="">
          <li
            *ngIf="isLoggedIn(); else loggedOut"
            class="list-none inline-block"
          >
            <a class="block px-3 cursor-pointer " (click)="logout()">Logout</a>
          </li>

          <ng-template #loggedOut>
            <li class="list-none inline-block" #loggedOut>
              <a class=" block px-3 " [routerLink]="['/login']">Login</a>
            </li>
          </ng-template>

          <li class="list-none inline-block">
            <a class=" block px-3 " [routerLink]="['/noteblocks']"
              >NoteBlocks</a
            >
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
export class NavbarComponent {
  private _authService: AuthService;
  private router: Router;

  constructor(private authService: AuthService, router: Router) {
    this._authService = authService;
    this.router = router;
  }

  logout() {
    this._authService.logoutUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }
}
