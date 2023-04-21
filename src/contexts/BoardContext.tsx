import {
  ProviderProps,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { IBoard } from "../models/Board";
import { IColumn } from "../models/Column";

interface IBoardContext {
  boards: IBoard[];
  selectedBoard: IBoard | null;
  addBoard: (title: string, columns?: IColumn[]) => void;
  selectBoard: (board: IBoard) => void;
  updateBoard: (board: IBoard) => void;
  getBoardById: (id: string) => IBoard | undefined;
}

export const BoardsContext = createContext<IBoardContext>({
  boards: [],
  addBoard: (title: string, columns: IColumn[] = []) => {},
  selectedBoard: null,
  selectBoard: (board: IBoard) => {},
  updateBoard: (board: IBoard) => {},
  getBoardById: (id: string) => undefined,
});

type Props = {
  children: ReactNode;
};

export function BoardsContextProvider({ children }: Props) {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);

  function addBoard(title: string, columns: IColumn[] = []) {
    if (title.trim().length > 0) {
      const board: IBoard = {
        columns,
        title,
        id: crypto.randomUUID(),
      };
      setBoards((b) => {
        const list = [...b, board];
        saveBoards(list);
        return list;
      });
    }
  }

  function saveBoards(boards: IBoard[]) {
    localStorage.setItem("boards", JSON.stringify(boards));
  }

  function updateBoard(board: IBoard) {
    const list = boards.map((b) => (b.id == board.id ? board : b));
    saveBoards(list);
    setBoards(list);
    if (board.id == selectedBoard?.id) {
      setSelectedBoard(board);
    }
  }

  function selectBoard(board: IBoard) {
    setSelectedBoard(board);
  }

  function getBoardById(id: string) {
    return boards.find((b) => b.id == id);
  }

  function toggleSubtaskDone(id: string) {}

  useEffect(() => {
    const localBoards = localStorage.getItem("boards");
    if (localBoards) {
      console.log("TEM BOARDS SALVAS");
      setBoards(JSON.parse(localBoards));
    }
  }, []);

  useEffect(() => {
    console.log("BOARDS FOI ATUALIZADO");
  }, [boards]);

  return (
    <BoardsContext.Provider
      value={{
        boards,
        selectedBoard,
        addBoard,
        selectBoard,
        updateBoard,
        getBoardById,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}
