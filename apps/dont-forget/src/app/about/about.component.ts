import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dont-forget-about',
  template: ` <p>about works!</p> `,
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
