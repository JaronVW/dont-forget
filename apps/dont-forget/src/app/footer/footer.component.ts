import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dont-forget-footer',
  template: ` 
  <footer class=" p-5 flex justify-end items-center border-t-2 bg-stickyNoteBeige border-black relative left-0 bottom-0 w-full mt-5">
    <h2 class=" text-sm  px-3 mr-auto">DontForget</h2>
  </footer>`,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    ('');
  }
}
