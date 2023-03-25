import { IsNotEmpty } from 'class-validator';

export class NoteDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  text: string;
  dateCreated: Date;
}
