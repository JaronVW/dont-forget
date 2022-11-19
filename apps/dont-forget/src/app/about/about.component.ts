import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dont-forget-about',
  template: ` <iframe src="/assets/documents/Casus_cswf.pdf"></iframe> `,
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AboutComponent implements OnInit {
  // constructor() {}

  ngOnInit(): void {""}
}
