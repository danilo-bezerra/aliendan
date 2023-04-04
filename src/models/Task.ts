import { ISubtask } from "./Subtask";

export interface ITask {
  id: string;
  columnId?: string,
  title: string;
  description?: string;
  subTasks: ISubtask[];
}
