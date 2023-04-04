import { IColumn } from "./Column";

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
