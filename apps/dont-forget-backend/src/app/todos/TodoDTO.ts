import { IsNotEmpty, IsOptional } from 'class-validator';

export class TodoDTO {
  @IsNotEmpty()
  title: string;
  @IsOptional()
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
