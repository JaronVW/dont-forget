import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
describe('NotesServiceService', () => {
  let service: NotesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService],
    });
    service = TestBed.inject(NotesService);

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get notes and call the right endpoint', () => {
    const mockNode = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: '2021-01-01',
    };
    const mockCourse = [
      {
        ...mockNode,
      },
    ];
    service.getNotes().subscribe((courseData) => {
      expect(courseData[0]).toEqual(mockNode);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockCourse);
  });

  it('should get note by id and call the right endpoint', () => {
    const mockNode = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: '2021-01-01',
    };
    service.getNoteById('123').subscribe((courseData) => {
      expect(courseData).toEqual(mockNode);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes/123'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockNode);
  });

  it('call non existing note ', () => {
    service.getNoteById('123').subscribe({
      next: (courseData) => {
        expect(courseData).toEqual(null);
      },
      error: (error) => {
        expect(error).toEqual('Note not found');
      },
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes/123'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(null, { status: 404, statusText: 'Note not found' });
  });

  it('should delete note and call the right endpoint', () => {
    service.deleteNote('123').subscribe((courseData) => {
      expect(courseData).toEqual(null);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes/123'
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });

  it('should add note and call the right endpoint', () => {
    service.addNote('Make math homework', 'Do it');
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(null);
  });

  it('should update note and call the right endpoint', () => {
    service.updateNote('123', 'Make math homework', 'Do it');
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes/123'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(null);
  });
});
