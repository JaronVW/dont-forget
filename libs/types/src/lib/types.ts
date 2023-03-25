
export interface INote {
  _id?: any;
  title: string;
  text: string;
}

export interface ITodo {
  _id?: any;
  title: string;
  description: string;
  dueDate: Date;
  dateCreated: Date;
  completed: boolean;
  tasks: ITask[];
}

export interface ITask {
  title: string;
  completed: boolean;
  dateCreated: Date;
}

export interface IUser {
  email: string;
  password: string;
  dateCreated: Date;
}
