import { Test, TestingModule } from '@nestjs/testing';
import { NoteBlocksServiceService } from './note-blocks-service.service';

describe('NoteBlocksServiceService', () => {
  let service: NoteBlocksServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteBlocksServiceService],
    }).compile();

    service = module.get<NoteBlocksServiceService>(NoteBlocksServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
