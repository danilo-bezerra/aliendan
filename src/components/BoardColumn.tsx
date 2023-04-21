import React, { useContext, useState } from "react";
import { IBoard } from "../models/Board";
import { getRandomColor } from "../utils/getRandomColor";
import { IColumn } from "../models/Column";
import { MdOutlineAdd } from "react-icons/md";
import { ITask } from "../models/Task";
import Modal from "./Modal";
import Label from "./Form/Label";
import { BoardsContext } from "../contexts/BoardContext";

type Props = {
  col: IColumn;
  onAddTask: () => void;
};

export default function BoardColumn({ col, onAddTask }: Props) {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const { boards, selectedBoard, updateBoard } = useContext(BoardsContext);

  function handleChangeTaskColumn(id: string) {
    // const column = selectedBoard?.columns.find((c) => c.id == id);
    // const oldColumn = selectedBoard?.columns.find((c) => (c.id = col.id));
    // if (column) {
    //   column.tasks.push(selectedTask!);
    //   const list = selectedBoard?.columns.map((c) => {
    //     if (c.id == column.id) {
    //       return column;
    //     }
    //     if (c.id == oldColumn?.id!) {
    //       return {
    //         ...oldColumn,
    //         tasks: oldColumn?.tasks.filter((t) => t.id != selectedTask!.id),
    //       };
    //     }
    //     return c;
    //   });
    //   updateBoard({ ...selectedBoard!, columns: list! });
    //}
  }

  const color = getRandomColor();

  console.log(selectedTask);

  return (
    <div className="w-60 shrink-0">
      <header className="flex items-center gap-2 mb-4">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <h3 className="font-semibold text-md tracking-wide text-gray-400">
          {col.name} ({col.tasks.length})
        </h3>
      </header>
      <section className="flex flex-col gap-4">
        {col.tasks.map((t) => (
          <button
            className="bg-gray-800 text-left px-6 py-4 rounded-lg shadow-lg shadow-slate-800/50 text-normal font-semibold"
            key={t.id}
            onClick={() => setSelectedTask(t)}
          >
            <span className="line-clamp-1 text-gray-100 tracking-wide">
              {t.title}
            </span>
            <span className="text-zinc-400  text-xs font-normal ">
              {t.subTasks.filter((s) => s.done).length} of {t.subTasks.length}{" "}
              subtasks done
            </span>
          </button>
        ))}
        <button
          className="flex justify-center opacity-30 bg-gray-800 px-6 py-4 rounded-lg shadow-lg shadow-slate-800/50 text-normal font-semibold hover:opacity-100"
          onClick={onAddTask}
        >
          <MdOutlineAdd size={20} />
        </button>
      </section>

      {!!selectedTask && (
        <Modal
          isActive={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.title || ""}
        >
          <Label className="text-sm mb-0.5">Description</Label>
          {selectedTask.description && (
            <>
              <p className="text-zinc-400 text-sm mb-4">
                {selectedTask.description}
              </p>
            </>
          )}
          <Label className="text-sm mb-2">
            Subtasks ({selectedTask.subTasks.filter((s) => s.done).length} of{" "}
            {selectedTask.subTasks.length})
          </Label>
          {selectedTask.subTasks.map((s) => (
            <div
              key={s.id}
              className="flex gap-2 bg-gray-900 p-2 mb-2 text-sm font-semibold"
            >
              <label className="flex items-center gap-2 w-full">
                <input
                  className="scale-x-110"
                  type="checkbox"
                  value={String(s.done)}
                />
                {s.title}
              </label>
            </div>
          ))}

          <Label>
            Column
            <select
              className="dark:bg-gray-700  w-full  h-10 p-2 rounded-[.25rem] outline outline-[2px] outline-offset-0 outline-gray-500 focus:outline-[3px]  focus:outline-blue-500 transition-colors"
              defaultValue={col.id}
              id="columnId"
              onChange={({ target }) => handleChangeTaskColumn(target.value)}
            >
              <option value="" selected disabled>
                Select
              </option>
              {selectedBoard!.columns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Label>
        </Modal>
      )}
    </div>
  );
}
