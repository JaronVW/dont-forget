import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dont-forget-footer',
  template: ` 
  <footer class=" p-5  border-y-2 bg-stickyNoteBlue border-black  mt-10 ">
    <h2 class=" text-sm  px-3 mr-auto">DontForget - Home</h2>
  </footer>`,
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    ('');
  }
}
