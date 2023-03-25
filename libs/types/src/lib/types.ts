
export interface INote {
  _id?: any;
  title: string;
  text: string;
  noteBlocks: [
    {
      NoteBlockId: any;
    }
  ];
  dateCreated: Date;
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
