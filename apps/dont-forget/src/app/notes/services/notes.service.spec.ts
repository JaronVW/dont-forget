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
    const mockNote = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: '2021-01-01',
    };
    const mockCourse = [
      {
        ...mockNote,
      },
    ];
    service.getNotes().subscribe((courseData) => {
      expect(courseData[0]).toEqual(mockNote);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockCourse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get note by id and call the right endpoint', () => {
    const mockNote = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: '2021-01-01',
    };
    service.getNoteById('123').subscribe((courseData) => {
      expect(courseData).toEqual(mockNote);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes/123'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockNote);
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
    const mockNote = {
      _id: '123',
      title: 'Make math homework',
      text: 'Do it',
      dateCreated: new Date('2021-01-01'),
    };
    service.addNote('Make math homework', 'Do it').subscribe((courseData) => {
      expect(courseData).toEqual(mockNote);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(mockNote);
  });

  it('should update note and call the right endpoint', () => {
    const mockNote = {
      _id: '123',
      title: 'Make math homework',
      text: 'Do it',
      dateCreated: new Date('2021-01-01'),
    };

    service.updateNote(mockNote).subscribe((courseData) => {
      expect(courseData).toEqual(mockNote);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes/123'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(null);
  });

  it('should delete non existing note and fail', () => {
    service.deleteNote('123').subscribe({
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
    expect(req.request.method).toEqual('DELETE');
    req.flush(null, { status: 404, statusText: 'Note not found' });
  });

  it('should update non existing note and fail', () => {
    service
      .updateNote({
        _id: '123',
        title: 'Make math homework',
        text: 'Do it',
        dateCreated: new Date('2021-01-01'),
      })
      .subscribe({
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
    expect(req.request.method).toEqual('PUT');
    req.flush(null, { status: 404, statusText: 'Note not found' });
  });

  it('should add note and fail', () => {
    service.addNote('Make math homework', 'Do it').subscribe({
      next: (courseData) => {
        expect(courseData).toEqual(null);
      },
      error: (error) => {
        expect(error).toEqual('Note not found');
      },
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(null, { status: 404, statusText: 'Note not found' });
  });

  it('should get notes and fail', () => {
    service.getNotes().subscribe({
      next: (courseData) => {
        expect(courseData).toEqual(null);
      },
      error: (error) => {
        expect(error).toEqual('Note not found');
      },
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/notes'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(null, { status: 404, statusText: 'Note not found' });
  });
});
