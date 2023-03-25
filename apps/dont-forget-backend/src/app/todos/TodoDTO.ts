import { IsNotEmpty } from 'class-validator';

export class TodoDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  dueDate: Date;
  dateCreated: Date;
  completed: boolean;
  tasks: {
    title: string;
    completed: boolean;
    dateCreated: Date;
  }[];
  numberOfTasks: number;
  userRef: string;
}
