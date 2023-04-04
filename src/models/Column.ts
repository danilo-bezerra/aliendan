import { ITask } from "./Task";

export interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}
