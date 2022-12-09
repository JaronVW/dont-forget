import { TestBed } from '@angular/core/testing';

import { NoteBlocksService } from './note-blocks.service';

describe('NoteBlocksService', () => {
  let service: NoteBlocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteBlocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
