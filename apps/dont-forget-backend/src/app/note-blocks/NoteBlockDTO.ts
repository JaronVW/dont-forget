import { IsNotEmpty } from 'class-validator';

export class NoteBlockDTO {
  userRef: any;

  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  dateCreated: Date;
  notes: {
    title: string;
    text: string;
    dateCreated: Date;
  }[];
}
