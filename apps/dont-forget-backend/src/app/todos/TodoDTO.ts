export class TodoDTO {
  title: string;
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

