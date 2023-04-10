import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dont-forget-notfound',
  template: `<div class="bg-white  border-2 border-black p-4 rounded-md">
    <h1 class="text-4xl">Pagina niet gevonden</h1>
    <p class="text-xl">De pagina die u probeert te bereiken bestaat niet.</p>
    <a [routerLink]="['/']" class="sitelink sitelink-success">Terug naar homepagina</a>
  </div> `,
  styles: [],
})
export class NotfoundComponent {}
