import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dont-forget-navbar',
  template: `
    <header
      class=" p-5 flex justify-end items-center border-b-2 bg-stickyNoteBlue border-black mb-10"
    >
      <h2 class=" px-3 mr-auto">
        <a [routerLink]="['/']">
          <img src="assets/img/logo.png" class="w-6 float-left mx-3" alt="" />
          DontForget</a
        >
      </h2>
      <nav class="">
        <ul class="">
          <ng-container *ngIf="isLoggedIn(); else loggedOut">
            <li class="list-none inline-block">
              <a class="block px-3 cursor-pointer " (click)="logout()"
                >Uitloggen</a
              >
            </li>
            <li class="list-none inline-block">
              <a
                class="block px-3 cursor-pointer select-none"
                (click)="toggleDropdown()"
                >{{ dropdownText }}</a
              >
            </li>
            <li *ngIf="Show" class="list-none inline-block ">
              <div
                class="absolute right-60 top-12 border-2 bg-stickyNoteBlue border-black rounded-md "
              >
                <div class="">
                  <a class=" block px-2 py-1 " [routerLink]="['/noteblocks']"
                    >Notitieblokken</a
                  >
                </div>
                <div class="">
                  <a class=" block px-2 py-1" [routerLink]="['/notes']"
                    >Notities</a
                  >
                </div>
                <div class="">
                  <a class=" block px-2 py-1" [routerLink]="['/todos']"
                    >Todos</a
                  >
                </div>
              </div>
            </li>
            <li class="list-none inline-block">
              <a class="block px-3 " [routerLink]="['/following']">Volgend</a>
            </li>
            <li class="list-none inline-block">
              <a class="block px-3 " [routerLink]="['/shared']"
                >Gedeeld met mij</a
              >
            </li>
          </ng-container>

          <ng-template #loggedOut>
            <li class="list-none inline-block" #loggedOut>
              <a class=" block px-3 " [routerLink]="['/login']">Login</a>
            </li>
          </ng-template>

          <li class="list-none inline-block">
            <a class="block px-3 " [routerLink]="['/about']">Over</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
})
export class NavbarComponent implements OnInit {
  private _authService: AuthService;
  private router: Router;
  Show = false;
  dropdownText: string;

  constructor(private authService: AuthService, router: Router) {
    this._authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
    this.dropdownText =
      localStorage.getItem('username')?.substring(0, 10)  || 'Person';
  }

  logout() {
    this._authService.logoutUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  toggleDropdown() {
    this.Show = !this.Show;
  }
}
