import { IsNotEmpty } from 'class-validator';

export class NoteDTO {
  userRef?: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  text: string;
  dateCreated: Date;
}
