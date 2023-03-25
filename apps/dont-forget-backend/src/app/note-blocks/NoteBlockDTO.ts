export class NoteBlockDTO {
  userRef: any;
  title: string;
  description: number;
  dateCreated: Date;
  notes: {
    title: string;
    text: string;
    dateCreated: Date;
  }[];
  numberOfNotes: number;
}
