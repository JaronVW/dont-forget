import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dont-forget-about',
  template: `<pdf-viewer
    [src]="pdfSrc"
    [render-text]="true"
    [original-size]="false"
    style="  height: 700px; margin: 10px 40px 25px 40px;"
  ></pdf-viewer>`,
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AboutComponent implements OnInit {
  pdfSrc = 'assets/documents/Casus_cswf.pdf';

  ngOnInit(): void {
    ('');
  }
}
